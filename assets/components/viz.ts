/** biome-ignore-all lint/style/noNonNullAssertion: easy to debug misspelling */

import { $, el, isInside } from "lib/html"

// Color clusters for UMAP visualization, using the brand hues from main.scss that the package tiles below use instead of a generic chart-library palette.
const colorClusters = [
  { color: "var(--spatialdata-blue)", count: 68, name: "Cluster A" },
  { color: "var(--mudata-green)", count: 58, name: "Cluster B" },
  { color: "var(--scvi-tools-yellow)", count: 52, name: "Cluster C" },
  { color: "var(--anndata-orange)", count: 44, name: "Cluster D" },
  { color: "var(--scirpy-purple)", count: 54, name: "Cluster E" },
  { color: "var(--squidpy-violet)", count: 48, name: "Cluster F" },
  { color: "var(--scanpy-cerise)", count: 38, name: "Cluster G" },
  { color: "var(--muon-aquamarine)", count: 62, name: "Cluster H" },
]

// 3D tilt effect
const MAX_ROTATION = 2

// Initialize interactive UMAP visualization
export class InteractiveViz extends HTMLElement {
  constructor() {
    super()
    const visualization = $(".visualization", HTMLElement, this)
    const card = $(".interactive-card", HTMLElement, this)
    const runImport = $(".cmd-import .command-icon", HTMLButtonElement, this)
    const runUmap = $(".cmd-umap .command-icon", HTMLButtonElement, this)
    const statusImport = $(".cmd-import .command-status", HTMLElement, this)
    const statusUmap = $(".cmd-umap .command-status", HTMLElement, this)
    const execAnimImport = $(".cmd-import .executing-animation", HTMLElement, this)
    const execAnimUmap = $(".cmd-umap .executing-animation", HTMLElement, this)
    const header = $(".demo-header", HTMLElement, this)

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
      // viz.scss, so the only thing left to do here is place the dots.
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

    // Clicking a dot focuses its cluster, which pulses it via :focus in viz.scss. Dropping the focus
    // again once the pulse has run is what makes a second click on the same cluster pulse it again.
    const cluster = (event: Event) => (event.target as HTMLElement).closest<HTMLElement>(".cluster")
    visualization.addEventListener("click", (event) => cluster(event)?.focus())
    visualization.addEventListener("animationend", (event) => cluster(event)?.blur())

    runImport.addEventListener("click", () => {
      statusImport.style.width = "0"
      execAnimImport.style.width = "0"

      setTimeout(() => {
        execAnimImport.style.width = "100%"
      }, 50)

      setTimeout(() => {
        statusImport.style.width = "100%"
        runImport.style.backgroundColor = "var(--bs-success-bg)"

        setTimeout(() => {
          runImport.style.backgroundColor = ""
        }, 2000)
      }, 800)
    })

    runUmap.addEventListener("click", () => {
      statusUmap.style.width = "0"
      execAnimUmap.style.width = "0"

      setTimeout(() => {
        execAnimUmap.style.width = "100%"
      }, 50)

      for (const dot of visualization.querySelectorAll(".dot")) {
        dot.classList.remove("is-visible")
      }

      setTimeout(() => {
        generateUMAP()

        statusUmap.style.width = "100%"
        runUmap.style.backgroundColor = "var(--bs-success-bg)"

        setTimeout(() => {
          runUmap.style.backgroundColor = ""
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
}

export default function init() {
  customElements.define("interactive-viz", InteractiveViz)
}
