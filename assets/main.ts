import "bootstrap" // see env.d.ts
import type { PagefindDocument } from "pagefind"

type Pagefind = typeof import("pagefind")

// Ecosystem package registry: free-text search, one active category, one active tag.
// Categories and tags both come from the controlled vocabulary in the registry schema.
const initEcosystemRegistry = () => {
  const root = document.querySelector<HTMLElement>("#ecosystem-packages")
  if (!root) return

  const input = root.querySelector<HTMLInputElement>("#eco-filter")!
  const chipRow = root.querySelector<HTMLElement>("#eco-chips")!
  const grid = root.querySelector<HTMLElement>("#eco-grid")!
  const counter = root.querySelector<HTMLElement>("#eco-count")!
  const empty = root.querySelector<HTMLElement>("#eco-empty")!
  const clearButton = root.querySelector<HTMLElement>("#eco-clear")!
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(".eco-card"))
  let activeCategory = ""
  let activeTag = ""

  const apply = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean)
    let shown = 0
    for (const card of cards) {
      const visible =
        terms.every((term) => card.dataset.search!.includes(term)) &&
        (!activeCategory || card.dataset.category === activeCategory) &&
        (!activeTag || card.dataset.tags!.includes(`|${activeTag}|`))
      card.hidden = !visible
      if (visible) shown += 1
    }
    counter.textContent = String(shown)
    empty.hidden = shown !== 0
    clearButton.hidden = !terms.length && !activeCategory && !activeTag
    for (const tag of root.querySelectorAll<HTMLElement>(".eco-tag")) {
      tag.classList.toggle("is-active", tag.dataset.tag === activeTag)
    }
  }

  const syncChips = () => {
    for (const chip of chipRow.querySelectorAll<HTMLElement>(".eco-chip")) {
      const isActive = chip.dataset.category === activeCategory
      chip.classList.toggle("is-active", isActive)
      chip.setAttribute("aria-pressed", String(isActive))
    }
  }

  const reset = () => {
    input.value = ""
    activeCategory = ""
    activeTag = ""
    syncChips()
    apply()
  }

  input.addEventListener("input", apply)
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") reset()
  })
  clearButton.addEventListener("click", () => {
    reset()
    input.focus()
  })
  empty.querySelector(".eco-empty-reset")!.addEventListener("click", reset)

  chipRow.addEventListener("click", (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>(".eco-chip")
    if (!chip) return
    activeCategory = activeCategory === chip.dataset.category ? "" : chip.dataset.category!
    syncChips()
    apply()
  })

  // Tags are not in the chip row — there are too many — so they filter from the cards themselves.
  grid.addEventListener("click", (event) => {
    const tag = (event.target as HTMLElement).closest<HTMLElement>(".eco-tag")
    if (!tag) return
    event.preventDefault()
    activeTag = activeTag === tag.dataset.tag ? "" : tag.dataset.tag!
    apply()
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
  })
}

// People directory: free-text search, one active role and one active package. Roles and packages
// both come from the page's own chip rows, so a URL like /people/?role=council survives a rename
// only as long as the id still exists — anything unknown falls back to the unfiltered list.
const initPeopleDirectory = () => {
  const root = document.querySelector<HTMLElement>("#people-directory")
  if (!root) return

  const input = root.querySelector<HTMLInputElement>("#people-filter")!
  const roleRow = root.querySelector<HTMLElement>("#people-roles")!
  const packageRow = root.querySelector<HTMLElement>("#people-packages")!
  const grid = root.querySelector<HTMLElement>("#people-grid")!
  const counter = root.querySelector<HTMLElement>("#people-count")!
  const empty = root.querySelector<HTMLElement>("#people-empty")!
  const clearButton = root.querySelector<HTMLElement>("#people-clear")!
  const notes = Array.from(root.querySelectorAll<HTMLElement>(".people-note"))
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(".person-card"))

  const values = (row: HTMLElement, key: string) =>
    new Set(Array.from(row.children).map((chip) => (chip as HTMLElement).dataset[key]!))
  const roles = values(roleRow, "role")
  const packages = values(packageRow, "package")

  const params = new URLSearchParams(window.location.search)
  const role = params.get("role") ?? ""
  const worksOn = params.get("works-on") ?? ""
  let activeRole = roles.has(role) ? role : ""
  let activePackage = packages.has(worksOn) ? worksOn : ""

  const syncChips = (row: HTMLElement, key: string, active: string) => {
    for (const chip of row.children) {
      const isActive = (chip as HTMLElement).dataset[key] === active
      chip.classList.toggle("is-active", isActive)
      chip.setAttribute("aria-pressed", String(isActive))
    }
  }

  const apply = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean)
    let shown = 0
    for (const card of cards) {
      const visible =
        terms.every((term) => card.dataset.search!.includes(term)) &&
        (!activeRole || card.dataset.roles!.includes(`|${activeRole}|`)) &&
        (!activePackage || card.dataset.works!.includes(`|${activePackage}|`))
      card.hidden = !visible
      if (visible) shown += 1
    }
    counter.textContent = String(shown)
    empty.hidden = shown !== 0
    clearButton.hidden = !terms.length && !activeRole && !activePackage
    for (const note of notes) {
      note.hidden = note.dataset.role !== activeRole
    }
    syncChips(roleRow, "role", activeRole)
    syncChips(packageRow, "package", activePackage)
  }

  const reset = () => {
    input.value = ""
    activeRole = ""
    activePackage = ""
    apply()
  }

  input.addEventListener("input", apply)
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") reset()
  })
  clearButton.addEventListener("click", () => {
    reset()
    input.focus()
  })
  empty.querySelector(".people-empty-reset")!.addEventListener("click", reset)

  roleRow.addEventListener("click", (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>(".people-chip")
    if (!chip) return
    activeRole = activeRole === chip.dataset.role ? "" : chip.dataset.role!
    apply()
  })
  packageRow.addEventListener("click", (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>(".people-chip")
    if (!chip) return
    activePackage = activePackage === chip.dataset.package ? "" : chip.dataset.package!
    apply()
  })

  apply()
}

// The contributor wall opens folded so it does not bury the page on a phone
const initContributorWall = () => {
  const mosaic = document.querySelector("#contributors")
  const button = document.querySelector("#contributor-expand")
  if (!mosaic || !button) return

  button.addEventListener("click", () => {
    const folded = mosaic.classList.toggle("is-clipped")
    button.textContent = folded ? "Show everyone" : "Show fewer"
    button.setAttribute("aria-expanded", String(!folded))
  })
}

// Table of contents for long pages. These headings come from templates rather than markdown, so
// Hugo's .TableOfContents cannot see them and the list is built from the rendered page instead.
const initTableOfContents = () => {
  const toc = document.querySelector<HTMLElement>(".toc")
  const body = document.querySelector<HTMLElement>(".with-toc-body")
  if (!toc || !body) return

  // Headings inside a nested <article> belong to a component, not to the page: the package cards
  // are articles with their own <h3> title and must not become sections of the contents.
  const scope = body.querySelector<HTMLElement>("article.post") || body
  const nested = (heading: HTMLElement) => {
    const article = heading.closest("article")
    return article !== null && article !== scope
  }
  const headings = [...scope.querySelectorAll<HTMLElement>("h2, h3")].filter(
    (heading) => heading.textContent!.trim() && !nested(heading),
  )
  if (headings.length < 3) return // too short to be worth a sidebar

  const list = toc.querySelector("ul")!
  const used = new Set<string>()
  const links = new Map<HTMLElement, HTMLAnchorElement>()

  for (const heading of headings) {
    if (!heading.id) {
      const slug = heading
        .textContent!.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      let id = slug
      for (let n = 2; used.has(id) || document.getElementById(id); n += 1) id = `${slug}-${n}`
      heading.id = id
    }
    used.add(heading.id)

    const link = document.createElement("a")
    link.href = `#${heading.id}`
    link.textContent = heading.textContent!.trim()

    const item = document.createElement("li")
    item.className = `toc-${heading.tagName.toLowerCase()}`
    item.append(link)
    list.append(item)
    links.set(heading, link)
  }

  toc.hidden = false

  // Highlight the last heading scrolled past. A handful of rect reads per scroll is cheap enough
  // to do directly, and avoids a throttle that can wedge if its callback never runs.
  const markCurrent = () => {
    let current = headings[0]
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top > 120) break
      current = heading
    }
    for (const [heading, link] of links.entries()) {
      link.classList.toggle("is-current", heading === current)
    }
  }
  window.addEventListener("scroll", markCurrent, { passive: true })
  markCurrent()
}

const filterTutorials = () => {
  const trs = document.querySelectorAll<HTMLElement>(".tutorial-item")
  const filter = document.querySelector<HTMLInputElement>("#tutorial-filter")!.value
  const regex = new RegExp(filter, "i")
  const tdFound = (td: Element) => regex.test(td.innerHTML)
  const pkgFound = (childrenArr: Element[]) => childrenArr.some(tdFound)
  for (const { style, children } of trs) {
    style.display = pkgFound([...children]) ? "" : "none"
  }
}

// Initialize interactive UMAP visualization
const initInteractiveViz = () => {
  //const container = document.getElementById('interactive-container')
  const card = document.querySelector<HTMLElement>("#interactive-card")!
  const visualization = document.querySelector<HTMLElement>("#visualization")!
  // Exit early if visualization elements don't exist on this page
  if (!visualization || !card) return

  const runCmd1 = document.querySelector<HTMLButtonElement>("#run-cmd1")!
  const runCmd2 = document.querySelector<HTMLButtonElement>("#run-cmd2")!
  const statusCmd1 = document.querySelector<HTMLElement>("#status-cmd1")!
  const statusCmd2 = document.querySelector<HTMLElement>("#status-cmd2")!
  const execAnim1 = document.querySelector<HTMLElement>("#exec-anim-1")!
  const execAnim2 = document.querySelector<HTMLElement>("#exec-anim-2")!

  // Color clusters for UMAP visualization, using the same brand hues the package tiles below use instead of a generic chart-library palette.
  const colorClusters = [
    { color: "#40a9ff", count: 68, name: "Cluster A" },
    { color: "#4ab274", count: 58, name: "Cluster B" },
    { color: "#fbb822", count: 52, name: "Cluster C" },
    { color: "#e5864b", count: 44, name: "Cluster D" },
    { color: "#da347f", count: 54, name: "Cluster E" },
    { color: "#969dea", count: 48, name: "Cluster F" },
    { color: "#de367b", count: 38, name: "Cluster G" },
    { color: "#6cf1a1", count: 62, name: "Cluster H" },
  ]

  // 3D tilt effect
  const MAX_ROTATION = 2

  document.addEventListener("mousemove", (e) => {
    const headerRect = document.querySelector(".demo-header")!.getBoundingClientRect()
    const vizRect = visualization.getBoundingClientRect()

    // Don't apply 3D transform when hovering over header or visualization
    if (
      (e.clientY >= headerRect.top &&
        e.clientY <= headerRect.bottom &&
        e.clientX >= headerRect.left &&
        e.clientX <= headerRect.right) ||
      (e.clientY >= vizRect.top &&
        e.clientY <= vizRect.bottom &&
        e.clientX >= vizRect.left &&
        e.clientX <= vizRect.right)
    ) {
      card.style.transform = "rotateX(0deg) rotateY(0deg)"
      return
    }

    const xAxis = (window.innerWidth / 2 - e.pageX) / 60
    const yAxis = (window.innerHeight / 2 - e.pageY) / 60

    const xRotation = Math.max(Math.min(yAxis, MAX_ROTATION), -MAX_ROTATION)
    const yRotation = Math.max(Math.min(-xAxis, MAX_ROTATION), -MAX_ROTATION)

    if (Math.abs(xRotation) < 0.2 && Math.abs(yRotation) < 0.2) {
      return
    }

    card.style.transition = "transform 0.3s ease-out"
    card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
  })

  document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)"
  })

  function generateUMAP() {
    for (const dot of visualization.querySelectorAll(".dot")) {
      dot.remove()
    }

    const width = visualization.clientWidth
    const height = visualization.clientHeight

    for (const cluster of colorClusters) {
      const centerX = Math.random() * 0.6 * width + 0.2 * width
      const centerY = Math.random() * 0.6 * height + 0.2 * height

      for (let i = 0; i < cluster.count; i++) {
        const dot = document.createElement("div")
        dot.className = "dot"
        dot.dataset.cluster = cluster.name
        dot.dataset.color = cluster.color

        const size = Math.floor(Math.random() * 8) + 5
        dot.style.width = `${size}px`
        dot.style.height = `${size}px`

        let u = 0,
          v = 0
        for (let j = 0; j < 6; j++) {
          u += Math.random()
          v += Math.random()
        }
        u = u / 6 - 0.5
        v = v / 6 - 0.5

        const distance = Math.random() * 130 + 20
        const dx = u * distance * 2
        const dy = v * distance * 2
        const x = centerX + dx
        const y = centerY + dy

        const safeX = Math.min(Math.max(size, x), width - size)
        const safeY = Math.min(Math.max(size, y), height - size)

        dot.style.left = `${safeX}px`
        dot.style.top = `${safeY}px`
        dot.style.backgroundColor = cluster.color

        visualization.appendChild(dot)

        const dataPoint = Math.floor(Math.random() * 1000)
        dot.dataset.id = `point-${dataPoint}`

        setTimeout(
          () => {
            dot.style.transform = "scale(1)"
            dot.style.opacity = "1"
          },
          i * 18 + Math.random() * 150,
        )
      }
    }

    setupDotInteractions()
  }

  function setupDotInteractions() {
    const dots = document.querySelectorAll<HTMLElement>(".dot")

    for (const dot of dots) {
      dot.addEventListener("mouseenter", () => {
        const thisColor = dot.dataset.color

        for (const otherDot of dots) {
          if (otherDot.dataset.color === thisColor) {
            otherDot.style.transform = "scale(1.4)"
            otherDot.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)"
            otherDot.style.zIndex = "5"
          } else {
            otherDot.style.opacity = "0.4"
          }
        }
      })

      dot.addEventListener("mouseleave", () => {
        for (const otherDot of dots) {
          otherDot.style.transform = "scale(1)"
          otherDot.style.opacity = "1"
          otherDot.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)"
          otherDot.style.zIndex = "1"
        }
      })

      dot.addEventListener("click", () => {
        const thisColor = dot.dataset.color
        const clusterDots = []

        for (const otherDot of dots) {
          if (otherDot.dataset.color === thisColor) {
            clusterDots.push(otherDot)
          }
        }

        for (const otherDot of clusterDots) {
          otherDot.classList.add("animation-pulse")

          setTimeout(() => {
            otherDot.classList.remove("animation-pulse")
          }, 1500)
        }
      })
    }
  }

  runCmd1.addEventListener("click", () => {
    statusCmd1.style.width = "0"
    execAnim1.style.width = "0"

    setTimeout(() => {
      execAnim1.style.width = "100%"
    }, 50)

    setTimeout(() => {
      statusCmd1.style.width = "100%"
      runCmd1.style.backgroundColor = "#34A853"

      setTimeout(() => {
        runCmd1.style.backgroundColor = ""
      }, 2000)
    }, 800)
  })

  runCmd2.addEventListener("click", () => {
    statusCmd2.style.width = "0"
    execAnim2.style.width = "0"

    setTimeout(() => {
      execAnim2.style.width = "100%"
    }, 50)

    for (const dot of visualization.querySelectorAll<HTMLElement>(".dot")) {
      dot.style.opacity = "0"
      dot.style.transform = "scale(0)"
    }

    setTimeout(() => {
      generateUMAP()

      statusCmd2.style.width = "100%"
      runCmd2.style.backgroundColor = "#34A853"

      setTimeout(() => {
        runCmd2.style.backgroundColor = ""
      }, 2000)
    }, 1200)
  })

  // Initial generation
  generateUMAP()

  // Responsive regeneration
  let resizeTimer: ReturnType<typeof setTimeout>
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(generateUMAP, 250)
  })
}

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]>,
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] => {
  const element = Object.assign(document.createElement(tag), props)
  element.append(...children)
  return element
}

interface Entity {
  name: string
  kind: string
  detail: string
  url: string
}

function initSearch() {
  const openButton = document.querySelector<HTMLElement>("#search-open")!
  const overlay = document.querySelector<HTMLElement>("#search-overlay")!
  if (!openButton || !overlay) return

  const dialog = document.querySelector<HTMLElement>("#search-dialog")!
  const input = document.querySelector<HTMLInputElement>("#search-input")!
  const status = document.querySelector<HTMLElement>("#search-status")!
  const results = document.querySelector<HTMLElement>("#search-results")!
  const closeButton = document.querySelector<HTMLElement>("#search-close")!

  let pagefindPromise: Promise<Pagefind | null> | null = null
  let lastQuery = ""
  let selected = -1
  let debounce: ReturnType<typeof setTimeout>

  let entitiesPromise: Promise<Entity[]> | null = null

  function loadEntities() {
    if (!entitiesPromise) {
      entitiesPromise = fetch("/search-entities.json")
        .then((response) => response.json())
        .catch(() => [])
    }
    return entitiesPromise
  }

  function matchEntities(entities: Entity[], query: string) {
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

  // Memoises the promise, not the module: two concurrent init() calls never resolve.
  function loadPagefind() {
    if (!pagefindPromise) {
      pagefindPromise = (async () => {
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
    return pagefindPromise
  }

  function open() {
    overlay.hidden = false
    document.body.style.overflow = "hidden"
    input.focus()
    input.select()
    loadPagefind()
  }

  function close() {
    overlay.hidden = true
    document.body.style.overflow = ""
    openButton.focus()
  }

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
  function relevant(hit: PagefindDocument) {
    const terms = normalise(lastQuery)
    if (!terms.length) return true
    const matched = [...hit.excerpt.matchAll(/<mark>(.*?)<\/mark>/g)].flatMap((m) => normalise(m[1]))
    return terms.some((term) => matched.some((word) => word.startsWith(term)))
  }

  // Both sides must be split the same way, or "rapids-singlecell" fails to match itself.
  function normalise(text: string) {
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

    const engine = await loadPagefind()
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

    if (!results.childNodes.length) {
      status.textContent = `No results for “${query}”`
      return
    }
    status.textContent = `${results.childNodes.length} result${results.childNodes.length === 1 ? "" : "s"}`
  }

  openButton.addEventListener("click", open)
  closeButton.addEventListener("click", close)

  overlay.addEventListener("mousedown", (event) => {
    if (!dialog.contains(event.target as Node)) close()
  })

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
    if (event.key === "Escape" && !overlay.hidden) {
      close()
    } else if (overlay.hidden && (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key === "k"))) {
      const tag = document.activeElement?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return
      event.preventDefault()
      open()
    }
  })
}

// initialize everything

initEcosystemRegistry()
initPeopleDirectory()
initContributorWall()

const tutorialFilter = document.querySelector("#tutorial-filter")
if (tutorialFilter) {
  tutorialFilter.addEventListener("input", filterTutorials)
}

initTableOfContents()

initSearch()

// Initialize interactive visualization if on home page
initInteractiveViz()
