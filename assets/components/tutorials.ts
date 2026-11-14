/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

import { $ } from "lib/html"

export class TutorialList extends HTMLElement {
  constructor() {
    super()
    const filter = $("input", HTMLInputElement, this)
    const items = this.querySelectorAll<HTMLElement>(".tutorial-item")

    filter.addEventListener("input", () => {
      const regex = new RegExp(filter.value, "i")
      for (const { style, children } of items) {
        style.display = [...children].some((td) => regex.test(td.innerHTML)) ? "" : "none"
      }
    })
  }
}

export default function init() {
  customElements.define("tutorial-list", TutorialList)
}
