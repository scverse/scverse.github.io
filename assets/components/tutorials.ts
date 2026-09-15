/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

export default function init(root: HTMLElement) {
  const filter = root.querySelector<HTMLInputElement>("#tutorial-filter")!
  const items = root.querySelectorAll<HTMLElement>(".tutorial-item")

  filter.addEventListener("input", () => {
    const regex = new RegExp(filter.value, "i")
    for (const { style, children } of items) {
      style.display = [...children].some((td) => regex.test(td.innerHTML)) ? "" : "none"
    }
  })
}
