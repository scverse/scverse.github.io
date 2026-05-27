+++
title = "Scverse Hackathon 2026-03 Berlin"
date = 2026-03-30T00:00:05+01:00
description = "scverse x proteomics hackathon"
draft = false
+++

## Welcome

Join us for the joint [scverse](https://scverse.org) x proteomics hackathon on **March 30-31, 2026** at the Max Delbrück Center, Mitte campus in Berlin.

This hackathon aims to bring together users and developers of scverse tools, and proteomics researchers, both imaging and mass spectrometry based. The main topic of this hackathon will be around the preprocessing and analysis of proteomic data, including: multiplex immunofluorescence, liquid-chromatrography mass spectrometry (even single-cell proteomics). During this hackathon, we will discuss approaches, data formats, packages, and best practices; and you will have the opportunity to improve these and the realated code. All contributions will be made publicly available on GitHub under an open source license.

## Hackathon Main Tasks

### Task 1: Best practices for imaging-based spatial proteomics

Task lead: Malte Kuehl

- Preprocessing: How do methods like z-scoring, range normalization, quantile normalization, Uniform, histogram clipping, histogram matching, arcsinh, etc. compare and how well do they work for different data modalities?
- Analysis: When to do segmentation-based approaches, when to opt for pixel-based, when to use spatial statistics, spatial domains, etc.? How to optimize clustering with pyclustree and other metrics?
- Statistics & interpretation: When to use classical statistics, when to opt for compositional analysis with pertpy and others, how to evaluate performance?

### Task 2: scverse-native data format for MS-based proteomics

Task lead: Lucas Diedrich

The main extension of the data format to existing data containers like mudata would be the formalization the relationship/mapping between the fundamental units of quantification in MS-proteomics (precursors) and high-level, biologically more relevant aggregated features (peptides, proteins).

- Implement the prototypes of the data structure that have been proposed in an scverse (i.e. anndata/mudata) compatible manner.
- Implement a related, simple downstream analysis that builds on the data format to get an intuition for the API (e.g. “Plot the distribution of all precursor intensities that correspond to a specific protein”)
- Implement one proof-of-principle reader from a quantification pipeline/search engine output (e.g. QuantMS, DIANN, alphadia) to the data container.

See [here](https://docs.google.com/document/d/1-ZrP50AktnSgQua07hC_CqCp57Z6nkg0h9zuYoF8T6Q/edit?usp=sharing) for a detailed plan of the hackathon. 
This list is not definitive: more will be added as we collect ideas.

## Registration

Please fill out the following [form](https://docs.google.com/document/d/1-ZrP50AktnSgQua07hC_CqCp57Z6nkg0h9zuYoF8T6Q/edit?usp=sharing)
