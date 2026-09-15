/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

import { el, isInside } from "../lib/html"

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

// Initialize interactive UMAP visualization
export default function init(root: HTMLElement) {
  const visualization = root.querySelector<HTMLElement>("#visualization")!
  const card = root.querySelector<HTMLElement>("#interactive-card")!
  const runCmd1 = root.querySelector<HTMLButtonElement>("#run-cmd1")!
  const runCmd2 = root.querySelector<HTMLButtonElement>("#run-cmd2")!
  const statusCmd1 = root.querySelector<HTMLElement>("#status-cmd1")!
  const statusCmd2 = root.querySelector<HTMLElement>("#status-cmd2")!
  const execAnim1 = root.querySelector<HTMLElement>("#exec-anim-1")!
  const execAnim2 = root.querySelector<HTMLElement>("#exec-anim-2")!
  const header = root.querySelector<HTMLElement>(".demo-header")!

  document.addEventListener("mousemove", (e) => {
    // Don't apply 3D transform when hovering over header or visualization
    if (isInside(header, e) || isInside(visualization, e)) {
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
    const width = visualization.clientWidth
    const height = visualization.clientHeight

    // One wrapper per cluster: hover, dimming and the click pulse are all .cluster rules in
    // main.scss, so the only thing left to do here is place the dots.
    visualization.replaceChildren(
      ...colorClusters.map((cluster) => {
        const centerX = Math.random() * 0.6 * width + 0.2 * width
        const centerY = Math.random() * 0.6 * height + 0.2 * height

        const dots = Array.from({ length: cluster.count }, (_unused, i) => {
          const dot = document.createElement("div")
          dot.className = "dot"

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

          setTimeout(() => dot.classList.add("is-visible"), i * 18 + Math.random() * 150)
          return dot
        })

        // tabIndex -1 keeps the group out of the tab order — the whole card is aria-hidden.
        return el("div", { className: "cluster", tabIndex: -1 }, ...dots)
      }),
    )
  }

  // Clicking a dot focuses its cluster, which pulses it via :focus in main.scss. Dropping the focus
  // again once the pulse has run is what makes a second click on the same cluster pulse it again.
  const cluster = (event: Event) => (event.target as HTMLElement).closest<HTMLElement>(".cluster")
  visualization.addEventListener("click", (event) => cluster(event)?.focus())
  visualization.addEventListener("animationend", (event) => cluster(event)?.blur())

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

    for (const dot of visualization.querySelectorAll(".dot")) {
      dot.classList.remove("is-visible")
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
