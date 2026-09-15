import "bootstrap" // see env.d.ts

import initContributorWall from "./components/contributors"
import initEcosystemRegistry from "./components/ecosystem"
import initPeopleDirectory from "./components/people"
import initSearch from "./components/search"
import initTableOfContents from "./components/toc"
import initTutorials from "./components/tutorials"
import initInteractiveViz from "./components/viz"

const ecoRoot = document.querySelector<HTMLElement>("#ecosystem-packages")
if (ecoRoot) initEcosystemRegistry(ecoRoot)

const peopleRoot = document.querySelector<HTMLElement>("#people-directory")
if (peopleRoot) initPeopleDirectory(peopleRoot)

const contribMosaic = document.querySelector<HTMLElement>("#contributors")
const contribButton = document.querySelector<HTMLButtonElement>("#contributor-expand")
if (contribMosaic && contribButton) initContributorWall(contribMosaic, contribButton)

const tutorialRoot = document.querySelector<HTMLElement>("#ecosystem-tutorials")
if (tutorialRoot) initTutorials(tutorialRoot)

const toc = document.querySelector<HTMLElement>(".toc")
const body = document.querySelector<HTMLElement>(".with-toc-body")
if (toc && body) initTableOfContents(toc, body)

const searchDialog = document.querySelector<HTMLDialogElement>("#search-dialog")
if (searchDialog) initSearch(searchDialog)

// Initialize interactive visualization if on home page
const interactiveRoot = document.querySelector<HTMLElement>("#interactive-container")
if (interactiveRoot) initInteractiveViz(interactiveRoot)
