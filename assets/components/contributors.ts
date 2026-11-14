import { $ } from "lib/html"

// The contributor wall opens folded so it does not bury the page on a phone
export class PeopleHero extends HTMLElement {
  constructor() {
    super()
    const mosaic = $(".people-mosaic", HTMLElement, this)
    const button = $("button.contributor-expand", HTMLButtonElement, this)

    button.addEventListener("click", () => {
      const folded = mosaic.classList.toggle("is-clipped")
      button.textContent = folded ? "Show everyone" : "Show fewer"
      button.setAttribute("aria-expanded", String(!folded))
    })
  }
}

export default function init() {
  customElements.define("people-hero", PeopleHero)
}
