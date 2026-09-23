/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

// Ecosystem package registry: free-text search, one active category, one active language, one active tag.
// Categories, languages and tags all come from the controlled vocabulary in the registry schema.
export default function init(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>("#eco-filter")!
  const chipRow = root.querySelector<HTMLElement>("#eco-chips")!
  const languageRow = root.querySelector<HTMLElement>("#eco-languages")!
  const grid = root.querySelector<HTMLElement>("#eco-grid")!
  const counter = root.querySelector<HTMLElement>("#eco-count")!
  const empty = root.querySelector<HTMLElement>("#eco-empty")!
  const clearButton = root.querySelector<HTMLElement>("#eco-clear")!
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(".eco-card"))
  let activeCategory: string | null = null
  let activeLanguage: string | null = null
  let activeTag: string | null = null

  const apply = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean)
    let shown = 0
    for (const card of cards) {
      const visible =
        terms.every((term) => card.dataset.search!.includes(term)) &&
        (!activeCategory || card.dataset.category === activeCategory) &&
        (!activeLanguage || card.dataset.languages!.includes(`|${activeLanguage}|`)) &&
        (!activeTag || card.dataset.tags!.includes(`|${activeTag}|`))
      card.hidden = !visible
      if (visible) shown += 1
    }
    counter.textContent = String(shown)
    empty.hidden = shown !== 0
    clearButton.hidden = !terms.length && !activeCategory && !activeLanguage && !activeTag
    for (const tag of root.querySelectorAll<HTMLElement>(".eco-tag")) {
      tag.classList.toggle("is-active", tag.dataset.tag === activeTag)
    }
  }

  const syncChips = (row: HTMLElement, key: "category" | "language", active: string | null) => {
    for (const chip of row.querySelectorAll<HTMLElement>(".eco-chip")) {
      const isActive = (chip.dataset[key] || null) === active
      chip.classList.toggle("is-active", isActive)
      chip.setAttribute("aria-pressed", String(isActive))
    }
  }

  const reset = () => {
    input.value = ""
    activeCategory = null
    activeLanguage = null
    activeTag = null
    syncChips(chipRow, "category", activeCategory)
    syncChips(languageRow, "language", activeLanguage)
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
    const category = chip.dataset.category || null
    activeCategory = activeCategory === category ? null : category
    syncChips(chipRow, "category", activeCategory)
    apply()
  })

  languageRow.addEventListener("click", (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>(".eco-chip")
    if (!chip) return
    const language = chip.dataset.language || null
    activeLanguage = activeLanguage === language ? null : language
    syncChips(languageRow, "language", activeLanguage)
    apply()
  })

  // Tags are not in the chip row — there are too many — so they filter from the cards themselves.
  grid.addEventListener("click", (event) => {
    const tag = (event.target as HTMLElement).closest<HTMLElement>(".eco-tag")
    if (!tag) return
    event.preventDefault()
    activeTag = activeTag === tag.dataset.tag ? null : tag.dataset.tag!
    apply()
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
  })
}
