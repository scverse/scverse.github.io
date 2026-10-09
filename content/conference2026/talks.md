+++
title = "Talks"
url = "/conference2026/talks"
type = "conference2026"
weight = 4
+++

Contributed talks, keynote abstracts, and poster guidelines for scverse conference 2026.
See the [schedule](/conference2026/schedule/) for the full day-by-day programme.

## Contributed talks

Contributed and flash talks run across four themed sessions on Days 1 and 2, selected from the submitted abstracts.
Full abstracts for every talk will be available in the final programme.

<div class="talks">
  <section class="talk-session is-s1">
    <div class="talk-session-head">
      <span class="talk-session-day">Day 1 · Mon 12 Oct</span>
      <h3 class="talk-session-title">Models, scaling &amp; agents</h3>
      <span class="talk-session-time">11:00–12:00</span>
    </div>
    <ul class="talk-list">
      <li class="talk"><span class="talk-time">11:00</span><span class="talk-main"><span class="talk-name">acumen</span><span class="talk-who">Pau Badia i Mompel</span></span></li>
      <li class="talk"><span class="talk-time">11:20</span><span class="talk-main"><span class="talk-name">SLIM</span><span class="talk-who">Dewei Hu</span></span></li>
      <li class="talk"><span class="talk-time">11:35</span><span class="talk-main"><span class="talk-name">Scirpy</span><span class="talk-who">Felix Petschko</span></span></li>
      <li class="talk is-flash"><span class="talk-time">11:50</span><span class="talk-main"><span class="talk-name">scAtlasTb <span class="talk-tag">Flash</span></span><span class="talk-who">Michaela Mueller</span></span></li>
      <li class="talk is-flash"><span class="talk-time">11:55</span><span class="talk-main"><span class="talk-name">Federated virtual cells <span class="talk-tag">Flash</span></span><span class="talk-who">Arian Amani</span></span></li>
    </ul>
  </section>
  <section class="talk-session is-s2">
    <div class="talk-session-head">
      <span class="talk-session-day">Day 1 · Mon 12 Oct</span>
      <h3 class="talk-session-title">Data structures &amp; R/Python interop</h3>
      <span class="talk-session-time">14:15–15:00</span>
    </div>
    <ul class="talk-list">
      <li class="talk"><span class="talk-time">14:15</span><span class="talk-main"><span class="talk-name">Unified data model</span><span class="talk-who">Daniele Bottazzi</span></span></li>
      <li class="talk"><span class="talk-time">14:35</span><span class="talk-main"><span class="talk-name">Bioconductor / scverse bridge</span><span class="talk-who">Artür Manukyan</span></span></li>
      <li class="talk is-flash"><span class="talk-time">14:50</span><span class="talk-main"><span class="talk-name">Icechunk <span class="talk-tag">Flash</span></span><span class="talk-who">Luiz Irber</span></span></li>
    </ul>
  </section>
  <section class="talk-session is-s3">
    <div class="talk-session-head">
      <span class="talk-session-day">Day 2 · Tue 13 Oct</span>
      <h3 class="talk-session-title">Proteomics</h3>
      <span class="talk-session-time">10:00–10:45</span>
    </div>
    <ul class="talk-list">
      <li class="talk"><span class="talk-time">10:00</span><span class="talk-main"><span class="talk-name">AlphaPeptTools</span><span class="talk-who">Vincenth Brennsteiner</span></span></li>
      <li class="talk"><span class="talk-time">10:20</span><span class="talk-main"><span class="talk-name">R/Python proteomics</span><span class="talk-who">Laurent Gatto</span></span></li>
      <li class="talk is-flash"><span class="talk-time">10:35</span><span class="talk-main"><span class="talk-name">Mantpy <span class="talk-tag">Flash</span></span><span class="talk-who">Mohamed Ghafoor</span></span></li>
    </ul>
  </section>
  <section class="talk-session is-s4">
    <div class="talk-session-head">
      <span class="talk-session-day">Day 2 · Tue 13 Oct</span>
      <h3 class="talk-session-title">Spatial omics</h3>
      <span class="talk-session-time">14:15–15:15</span>
    </div>
    <ul class="talk-list">
      <li class="talk"><span class="talk-time">14:15</span><span class="talk-main"><span class="talk-name">Squidpy 2.0</span><span class="talk-who">Tim Treis</span></span></li>
      <li class="talk"><span class="talk-time">14:30</span><span class="talk-main"><span class="talk-name">Scalable + interactive</span><span class="talk-who">Arne Defauw</span></span></li>
      <li class="talk"><span class="talk-time">14:45</span><span class="talk-main"><span class="talk-name">spatialdata.js / MDV</span><span class="talk-who">Peter Todd</span></span></li>
      <li class="talk is-flash"><span class="talk-time">15:00</span><span class="talk-main"><span class="talk-name">AIH liver <span class="talk-tag">Flash</span></span><span class="talk-who">Franz Ake</span></span></li>
      <li class="talk is-flash"><span class="talk-time">15:05</span><span class="talk-main"><span class="talk-name">MERFISHEYES <span class="talk-tag">Flash</span></span><span class="talk-who">Ignatius Jenie</span></span></li>
    </ul>
  </section>
</div>

## Keynote talks

### AI for Image-based Systems Biology: From Cryo-Electron Tomography to Virtual Spatial Transcriptomics

**Tingying Peng** · Helmholtz Munich

Recent advances in biological imaging technologies, including cryo-electron tomography and light-sheet microscopy, are enabling the visualization of cellular structures across multiple spatial and temporal scales. However, extracting quantitative insights from increasingly large and complex datasets remains a major challenge. In this talk, I will present our work on developing artificial intelligence methods for quantitative bioimage analysis. I will highlight our recent work on MemBrain v2, an AI framework for automated analysis of membrane organization in cryo-electron tomography that enables large-scale detection of membrane-associated protein complexes directly in situ. MemBrain integrates automated membrane segmentation, geometry-aware particle detection, and downstream analysis of protein organization. I will also briefly discuss additional projects from our group that develop AI methods for microscopy image enhancement and analysis, including tools for illumination correction, such as BaSiCPy, and light-sheet microscopy data processing, such as the Leonardo-toolset.

Finally, I will present our recent work on Phoenix, a generative AI framework for virtual spatial transcriptomics from routine histology. Phoenix integrates multimodal information across tissue morphology, cell states, and gene expression to infer spatially resolved single-cell molecular profiles in situ. Applied across large patient cohorts and disease contexts, Phoenix enables in silico analysis of treatment response, discovery of spatial biomarkers, and prediction of disease-associated tissue organization. This work extends quantitative biological imaging beyond image enhancement and object detection toward multimodal data integration and predictive modeling of molecular tissue states. Together, these approaches aim to enable scalable, quantitative, and predictive analysis of biological imaging data and facilitate new discoveries in structural, cellular, and spatial biology.

### The Rosetta Stone for Human Disease

**Muzlifah Haniffa** · Wellcome Sanger Institute & University of Cambridge

The revolution in single cell genomics, complemented by more recent developments in spatial technologies and artificial intelligence, has changed our understanding of the cellular building blocks of the human body and how our cells form the tissue ecosystems crucial for function. To map the trillions of cells of the body, a large community of researchers from across the globe have assembled under a global consortium, the Human Cell Atlas (HCA). In her talk, Muzlifah Haniffa will discuss the impact of the HCA on modern biomedicine, and then her own work using spatially resolved single-cell genomics and artificial intelligence to decode human development. Her lab has generated the Human Developmental Cell Atlas (HDCA), a unified resource that integrates published and unpublished single-cell/nucleus RNAseq atlases as well as a spatially resolved multimodal cell atlas of 6PCW whole embryos. The HDCA contains ~4.6M cells and ~500 cell types, which were resolved into 94 tissue niches during early development using unsupervised deep learning. This allows description of the development of distributed networks such as the stroma, vasculature and the peripheral nervous system. The HDCA thus provides a holistic window into how human tissue ecosystems are built.

<div class="placeholder-note">More keynote talks to be announced.</div>

## Posters

Poster boards are **160 × 120 cm (W × H)**, in landscape orientation.
Please keep your poster to a maximum of **155 × 115 cm (W × H)** so it fits the board.
In the A series, **A0 landscape (118.9 × 84.1 cm)** fits comfortably.
