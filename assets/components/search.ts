/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

import type { PagefindDocument } from "pagefind"

import { el, isInside } from "../lib/html"

type Pagefind = typeof import("pagefind")

interface Entity {
  name: string
  kind: string
  detail: string
  url: string
}

export default function init(dialog: HTMLDialogElement) {
  const input = dialog.querySelector<HTMLInputElement>("#search-input")!
  const status = dialog.querySelector<HTMLElement>("#search-status")!
  const results = dialog.querySelector<HTMLElement>("#search-results")!

  let lastQuery = ""
  let selected = -1

  function setSelected(next: number) {
    const items = results.querySelectorAll("a")
    if (!items.length) return
    if (selected >= 0 && items[selected]) items[selected].removeAttribute("aria-selected")
    selected = (next + items.length) % items.length
    items[selected].setAttribute("aria-selected", "true")
    items[selected].scrollIntoView({ block: "nearest" })
  }

  // Pagefind matches when an indexed word is a prefix of the search term, so
  // "xylophone" comes back matching "x" on seventeen pages.
  function relevant(hit: PagefindDocument): boolean {
    const terms = normalise(lastQuery)
    if (!terms.length) return true
    const matched = [...hit.excerpt.matchAll(/<mark>(.*?)<\/mark>/g)].flatMap((m) => normalise(m[1]))
    return terms.some((term) => matched.some((word) => word.startsWith(term)))
  }

  async function render(query: string) {
    if (query === lastQuery) return
    lastQuery = query
    selected = -1

    if (query.length < 2) {
      results.replaceChildren()
      status.textContent = ""
      return
    }

    const pinned = matchEntities(await loadEntities(), query)
    if (query !== lastQuery) return

    const engine = await loadPagefind(status)
    if (!engine) return

    status.textContent = "Searching…"
    const search = await engine.search(query)
    if (query !== lastQuery) return

    const candidates = await Promise.all(search.results.slice(0, 30).map((result) => result.data()))
    if (query !== lastQuery) return

    const top = candidates.filter(relevant).slice(0, 12)

    results.replaceChildren(
      ...pinned.map((entity) =>
        resultRow({
          link: { href: entity.url, target: "_blank", rel: "noopener", className: "search-result-entity" },
          title: entity.name,
          labelClass: "kind",
          label: entity.kind,
          excerpt: { textContent: entity.detail },
        }),
      ),
      ...top.map((hit) =>
        resultRow({
          link: { href: hit.url },
          title: hit.meta.title || hit.url,
          labelClass: "url",
          label: hit.url,
          excerpt: { innerHTML: hit.excerpt },
        }),
      ),
    )

    const n = results.childNodes.length
    status.textContent = n ? `${n} result${n === 1 ? "" : "s"}` : `No results for “${query}”`
  }

  // close dialog when clicking backdrop
  dialog.addEventListener("click", (event) => {
    if (!isInside(dialog, event)) dialog.close()
  })

  let debounce: ReturnType<typeof setTimeout>
  input.addEventListener("input", () => {
    clearTimeout(debounce)
    debounce = setTimeout(() => render(input.value.trim()), 150)
  })

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setSelected(selected + 1)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setSelected(selected - 1)
    } else if (event.key === "Enter") {
      const items = results.querySelectorAll("a")
      if (selected >= 0 && items[selected]) {
        event.preventDefault()
        items[selected].click()
      }
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog while it is open.
      const focusable = dialog.querySelectorAll<HTMLElement>("input, button, a")
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dialog.close()
    } else if (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key === "k")) {
      const tag = document.activeElement?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      event.preventDefault()
      dialog.showModal()
    }
  })
}

let _entitiesPromise: Promise<Entity[]> | null = null
function loadEntities(): Promise<Entity[]> {
  if (!_entitiesPromise) {
    _entitiesPromise = fetch("/search-entities.json")
      .then((response) => response.json())
      .catch(() => [])
  }
  return _entitiesPromise
}

function matchEntities(entities: Entity[], query: string): Entity[] {
  const terms = normalise(query)
  if (!terms.length) return []
  return entities
    .map((entity) => {
      const name = entity.name.toLowerCase()
      const words = normalise(entity.name)
      let rank = -1
      if (name === query.toLowerCase()) rank = 0
      else if (name.startsWith(query.toLowerCase())) rank = 1
      else if (terms.every((term) => words.some((word) => word.startsWith(term)))) rank = 2
      return { entity, rank }
    })
    .filter((scored) => scored.rank >= 0)
    .sort((a, b) => a.rank - b.rank || a.entity.name.length - b.entity.name.length)
    .slice(0, 3)
    .map((scored) => scored.entity)
}

let _pagefindPromise: Promise<Pagefind | null> | null = null
// Memoises the promise, not the module: two concurrent init() calls never resolve.
function loadPagefind(status: HTMLElement): Promise<Pagefind | null> {
  if (!_pagefindPromise) {
    _pagefindPromise = (async () => {
      const engine = await import("pagefind")
      await engine.options({ excerptLength: 25 })
      await engine.init()
      return engine
    })().catch(() => {
      // The index is written after `hugo` by `npx pagefind`.
      status.textContent = "Search index unavailable. Run `npx pagefind --site public` after building."
      return null
    })
  }
  return _pagefindPromise
}

// Both sides must be split the same way, or "rapids-singlecell" fails to match itself.
function normalise(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 1)
}

const span = (className: string, props: Partial<HTMLSpanElement>) =>
  el("span", { className: `search-result-${className}`, ...props })

const resultRow = (row: {
  link: Partial<HTMLAnchorElement>
  title: string
  labelClass: "kind" | "url"
  label: string
  excerpt: Partial<HTMLSpanElement>
}) =>
  el(
    "li",
    {},
    el(
      "a",
      row.link,
      span("title", { textContent: row.title }),
      " ",
      span(row.labelClass, { textContent: row.label }),
      span("excerpt", row.excerpt),
    ),
  )
