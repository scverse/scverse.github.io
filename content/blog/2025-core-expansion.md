+++
title = "Four new scverse core packages"
date = 2025-07-01T00:00:05+01:00
description = "scverse expands with new core packages."
author = "Lukas Heumos"
draft = false
+++

# Four new core packages in scverse

We're happy to announce that four new packages have joined the scverse core ecosystem: [SnapATAC2](https://github.com/scverse/snapatac2), [rapids-singlecell](https://github.com/scverse/rapids_singlecell), [pertpy](https://github.com/scverse/pertpy), and [decoupler](https://github.com/scverse/decoupler).
This broadens the scope of scverse beyond our so far supported modalities and brings in new functionality for epigenomics, perturbation screens, GPU acceleration, and functional inference.

Single-cell analysis is evolving rapidly, with new experimental modalities and larger datasets becoming the norm.
To keep up with this, we’re expanding scverse to support more domains, more data types, and more scalable computing backends.
By bringing these mature, well-maintained tools into the core, we aim to provide a consistent and interoperable foundation across all stages of single-cell analysis.

We're also welcoming the following lead maintainers to the scverse core developer team:  
- **Kai Zhang** for **snapatac2**
- **Pau Badia i Mompel** for **decoupler**

## SnapATAC2

[SnapATAC2](https://github.com/scverse/snapatac2) enables fast, scalable analysis of single-cell ATAC-seq and related epigenomic data.  
Built in Rust with a Python front end, it handles millions of cells efficiently.  
The package offers preprocessing, dimensionality reduction, clustering, and visualization methods.  
All outputs are stored in AnnData and integrate seamlessly with scanpy and other scverse frameworks.

<img src="/img/blog/snapatac2_overview.png" style="max-width: 100%;" alt="SnapATAC2 overview" />

## rapids-singlecell

[rapids-singlecell](https://github.com/scverse/rapids_singlecell) accelerates the full single-cell analysis pipeline through GPU acceleration with CuPy and NVIDIA RAPIDS.
Core steps—including PCA, neighborhood graph construction, and clustering—are executed on GPU using cuML, cuGraph, and custom CUDA/CuPy kernels for peak performance.

RSC integrates directly with AnnData and offers near drop-in replacements not only for scanpy, but also for selected functions from decoupler and squidpy.
By preserving familiar APIs and data structures, it enables seamless GPU acceleration of existing workflows—scaling to millions of cells without the computational bottlenecks of CPU-based analysis.

For more details, we refer to a recent blog post by NVIDIA: [Driving Toward Billion-Cell Analysis and Biological Breakthroughs with RAPIDS-singlecell](https://developer.nvidia.com/blog/driving-toward-billion-cell-analysis-and-biological-breakthroughs-with-rapids-singlecell)

## pertpy

[pertpy](https://github.com/scverse/pertpy) focuses on single-cell perturbation screens, including CRISPR and compound treatments.  
It supports differential analysis, signature scoring, and dose-response modeling.  
Metadata handling and visualization are tailored for perturbation-specific use cases.  
Built on AnnData and scverse libraries, pertpy fits smoothly into existing pipelines.

<img src="https://github.com/user-attachments/assets/d2e32d69-b767-4be3-a938-77a9dce45d3f" alt="pertpy figure" style="max-width: 100%;" />

## decoupler

[decoupler](https://github.com/scverse/decoupler) enables the inference of enrichment scores from omics data using prior knowledge.  
It maps omics profiles to annotated biological sets, such as transcription factors, pathways, or kinases, using methods like GSEA, GSVA, and linear models.
Designed for bulk, single-cell and spatial data, decoupler works directly with our scverse core data structures.

<img src="/img/blog/decoupler_overview.png" style="max-width: 100%;" alt="decoupler overview" />

## What this means

We're continuing to support a modular but coherent ecosystem where high-quality tools can interoperate.
These additions bring coverage of new data types and analysis goals while staying within the same technical foundations.
All packages use our scverse core data structures, follow shared conventions, and benefit from a growing set of shared infrastructure and community practices.
We aim to keep development decentralized and open while improving alignment across projects.

## Get involved

If you're building something new, we'd love to have your work be a part of the [scverse ecosystem](https://github.com/scverse/ecosystem-packages).
If you're our tools, please share feedback or ideas via the respective issue trackers.
The best places to start are [scverse.org](https://scverse.org), [github.com/scverse](https://github.com/scverse), and our [scverse zulip chat](https://scverse.zulipchat.com/).
We're always looking for more contributors to our packages but especially also for community related work.
Please reach out!

## Thank you

We’re grateful to the maintainers of these packages for their work and commitment to open, reusable tools.  
Their contributions help make the scverse ecosystem more useful, inclusive, and sustainable.
We’re also thankful to the community for using, testing, and contributing to these tools — your feedback drives everything we do.

*— The scverse core team*
