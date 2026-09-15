/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

// People directory: free-text search, one active role and one active package. Roles and packages
// both come from the page's own chip rows, so a URL like /people/?role=council survives a rename
// only as long as the id still exists — anything unknown falls back to the unfiltered list.
export default function init(root: HTMLElement) {
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
