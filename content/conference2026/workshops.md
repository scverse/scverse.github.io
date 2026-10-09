+++
title = "Workshops"
url = "/conference2026/workshops"
type = "conference2026"
weight = 5
+++

## Workshops

Hands-on workshops run on Day 2 and Day 3. On Day 3, the opening session is plenary — for all participants — and the two later slots run as parallel tracks, so you can pick one in each. See the [schedule](/conference2026/schedule/) for timings and rooms.

### From Data to Insight: Hands-On with Sentira Single Cell

**10x Genomics** · Day 2

Join 10x Genomics for an exclusive, hands-on introduction to Sentira Single Cell — 10x Genomics' newly announced autonomous AI agent for Chromium analysis, designed to transform how you navigate high-dimensional omics data.

The exponential growth, scale, and resolution of single-cell and spatial omics have fundamentally transformed our understanding of biology and disease. However, the sheer size of some datasets remains a persistent bottleneck. While modern pipelines process data efficiently, they still demand deep intuition and significant technical acumen to select optimal analytical strategies.

To overcome these barriers, 10x Genomics introduces Sentira Single Cell, a highly scalable framework that democratizes omics analysis through autonomous, LLM-driven workflows. Crucially, Sentira is built upon the trusted ecosystem of core scverse packages. By orchestrating popular tools like Scanpy, AnnData, and Azimuth under the hood, Sentira seamlessly bridges the gap between biological intuition and computational execution. We will walk through how the multi-agent system can decompose a user-specified hypothesis into a bounded execution plan, evaluate intermediate results against explicit success criteria, and adaptively replan to ensure robust, reproducible discoveries.

**What to expect:** a fully immersive, interactive session where you use Sentira Single Cell for complex analytical tasks, with low-latency real-time visualization and interactive downstream analysis in a streamlined web interface. Participants will explore how Sentira translates natural language into execution, self-evaluates and adapts, and accelerates high-plex discovery.

**Bring your own data:** following a brief overview of the platform's architecture, attendees are highly encouraged to bring their own single-cell data (e.g. scRNA-seq in `.h5` format) to run live through Sentira during the hands-on segment. For those without data on hand, 10x Genomics will provide benchmark datasets to explore and analyze.

**Prepare in advance.** To take part in the hands-on segment, please complete both of these before the session:

- Sign up for a 10x Cloud Analysis account — [sign up or sign in](https://www.10xgenomics.com/products/cloud-analysis).
- Request early access for Sentira — [10xgenomics.com/software/sentira](https://www.10xgenomics.com/software/sentira).

### Hands-on single-cell analysis with Claude Science

**Anthropic**

Claude Science is Anthropic's new AI workbench for scientific research, currently in public beta. It runs on your own laptop or server with the standard Claude models, and adds what a researcher needs around them, including persistent Python and R sessions that you can drive with varying levels of coding experience, connections to more than 60 public scientific databases, and analysis specialists for single-cell, genomics, proteomics and other domains. Everything it produces is saved with the code, environment and reasoning that generated it, so a result can be reproduced and audited by you or anyone in your lab long after the session ends.

In this workshop we will go over a real-life application in the single-cell space. Starting from public data or your own, we will showcase Claude Science with an end-to-end analysis of single-cell data that leads to biological insight, driven by conversation and built on scverse tools. Along the way we will look at how Claude plans an analysis, how it writes and runs real code you can read and keep, how it checks its own work, and where a scientist still needs to step in and steer. The session is aimed at people with light coding experience and a strong interest in getting answers out of single-cell experiments. If you can describe the biological question, we will show you how far Claude Science can take you toward the analysis, and how to stay in control of what it did and why.

**Who it's for.** Little or no coding experience is needed — and even experienced computational biologists will get a lot out of it.

**Prepare in advance.** To follow along hands-on, please install Claude Science before the session:

- Install the app from [claude.com/science](https://claude.com/science) and sign in. The first launch takes a few minutes to set up, so open it once beforehand.
- You will need a Claude account on a **Pro** or **Max** plan, or a **Team / Enterprise** plan whose owning institution has enabled Claude Science.
- Requirements: macOS 13 or later, Windows, or 64-bit Linux, and about 5 GB of free disk space. See the [install guide and system requirements](https://claude.com/docs/claude-science).
- Bring a laptop (macOS, Windows or Linux) and its charger, and a reliable, fast internet connection — Claude Science sends prompts to Anthropic's models and pulls from public scientific databases during the analysis.
- Optionally, bring a single-cell dataset of your own; otherwise we will work from a public dataset. Anyone who cannot install the app can still follow along on the main screen.

### scviva-tools: From Niche Embeddings to Gene Modules

**Can Ergen** · scverse

scviva-tools is a consolidated, scverse-native spatial transcriptomics toolkit built on scvi-tools, unifying probabilistic models and downstream analysis under one pip-installable API. The model layer includes ResolVI (denoising and segmentation-error correction), DestVI (multi-resolution cell-type deconvolution), scVIVA (niche-aware representation learning), DiagVI, gimVI, Stereoscope, and Tangram, with more models added as the community contributes. The downstream layer consumes these outputs, or raw annotated spatial data directly, to answer targeted biological questions: Harreman infers metabolic exchange and cell-cell communication, CSDE recovers de-biased differential expression, VIVS identifies genes conditionally dependent on an external response, and VISION scores gene signatures for spatial autocorrelation. Every downstream tool reads directly from a model's output written into the datamodule's .obs/.layers/latent space, so results compose without custom glue code. In this one hour workshop we focus on one complete pipeline rather than a full tour of the toolkit. Participants will run scVIVA on a spatial dataset to learn niche-aware representations, then feed that embedding directly into Harreman to identify gene modules underlying cell-cell communication within those niches with no custom glue code required, since Harreman reads straight from scVIVA's output in the shared datamodule. Along the way we'll show how the rest of scviva-tools extends from this same foundation, so participants leave with a working local install, a runnable scVIVA to Harreman notebook they can adapt to their own data, and a clear sense of where the other models and tools fit in.

### SegTraQ: A toolbox to assess segmentation and transcript assignment quality in spatial transcriptomics data

**Matthias Meyer-Bender**

Cell segmentation in spatial transcriptomics data is hampered by several technical factors:

- Cells may be sectioned without their nuclei, leading to undersegmentation.
- Overlapping cells in the z-plane can appear as one cell in 2D projections, leading to mixed expression profiles.
- Transcript diffusion can occur during tissue processing, contaminating neighboring cells.

To address these limitations, transcript-informed segmentation methods leverage spatial co-expression patterns of transcripts. However, evaluating the quality of the segmentation is difficult due to the high-dimensional and sparse nature of the data and the lack of manually curated datasets.

We introduce SegTraQ, a Python-based framework for segmentation and transcript assignment quality control in spatial transcriptomics data. SegTraQ computes quantitative metrics designed to highlight regions or samples with poorly segmented cells, and guide the choice of appropriate segmentation methods. The package is composed of six modules, each of which addresses a different aspect of segmentation quality, such as undersegmentation, mutually exclusive coexpression rate, or unresolved overlap between cells in 3D. Based on the spatialdata format, SegTraQ integrates seamlessly into the scverse ecosystem.

In this workshop, we demonstrate how these metrics can be used to compare different segmentations, both between samples and between algorithms.

The session opens with a 15-minute introduction to the topic, after which participants work through a notebook hands-on with the data and packages.

**Prepare in advance.** The workshop materials are on [GitHub](https://github.com/MeyerBender/segtraq_workshop). Please download the dataset (~600 MB) [from here](https://oc.embl.de/index.php/s/bBj36ET5S3v5VMW) before the session — depending on network capacity on the day, there may also be time to download it on-site.

### GPU-Accelerated Single-Cell Genomics: Tools, Workflows, and Spatial Analysis

**NVIDIA** · Trainers: Severin Dicks, Lukas Heumos, Sara Jimenez · Support: Heidi Shin

**Objective:** participants will understand how to GPU-accelerate single-cell and spatial workloads using the scverse ecosystem through a familiar single-cell workflow run using RAPIDS-singlecell.

Single-cell genomics datasets have grown exponentially, from thousands of cells per sample to millions in a single experimental design. This shift moves the field from method development to method acceleration, enabling researchers to answer existing biological questions at previously impossible scale. NVIDIA develops software libraries and open models to support this acceleration, including CUDA-X, Parabricks, and BioNemo. Together with scverse, we introduce rapids-singlecell, a GPU-accelerated implementation of foundational single-cell tools like scanpy, squidpy, pertpy, and decoupler. Through scverse-backends, users can seamlessly switch between CPU and GPU analysis based on computational needs and data scale. This workshop combines short lectures with hands-on examples. We demonstrate a real-world case study using 10x Genomics' Atera technology — a high-throughput image-based platform generating whole-transcriptome data. We walk through the complete analysis pipeline step-by-step, highlighting new functionalities for spatial niche detection and evaluation.

### 3D spatial transcriptomics with Stellaromics

**Stellaromics**

A hands-on tutorial working with 3D spatial transcriptomics data from the Stellaromics commercial platform.

<div class="placeholder-note">Full abstract to follow.</div>
