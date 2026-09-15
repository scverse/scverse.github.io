// The contributor wall opens folded so it does not bury the page on a phone
export default function init(mosaic: HTMLElement, button: HTMLButtonElement) {
  button.addEventListener("click", () => {
    const folded = mosaic.classList.toggle("is-clipped")
    button.textContent = folded ? "Show everyone" : "Show fewer"
    button.setAttribute("aria-expanded", String(!folded))
  })
}
