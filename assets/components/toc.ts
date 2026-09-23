/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

// Table of contents for long pages. These headings come from templates rather than markdown, so
// Hugo's .TableOfContents cannot see them and the list is built from the rendered page instead.
export default function init(toc: HTMLElement, body: HTMLElement) {
  // Headings inside a nested <article> belong to a component, not to the page: the package cards
  // are articles with their own <h3> title and must not become sections of the contents.
  const scope = body.querySelector<HTMLElement>("article.post") ?? body
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
