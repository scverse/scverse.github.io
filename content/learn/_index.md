+++
title = "Getting Started"

tutorials_intro = """\
If you are new to the scverse, get started with this set of tutorials covering basic analysis and functionality of the core packages.
For more tutorials as well as API documentation and user guides, see the sites of [individual packages](/packages/).
Beyond the core packages, the scverse [ecosystem](/packages/#ecosystem) contains many community-maintained packages that build on scverse data structures and integrate into standard workflows.
If you work primarily in another language, the scverse on-disk formats can be read from R, Julia, and beyond, as covered by the interoperability pages for [AnnData](https://anndata.scverse.org/en/stable/interoperability.html), [MuData](https://mudata.readthedocs.io/stable/interoperability.html), and [SpatialData](https://spatialdata.scverse.org/en/latest/interoperability.html).

You can also find recordings of past talks and workshops on our [YouTube channel](https://www.youtube.com/channel/UCpsvsIAW3R5OdftJKKuLNMA).
"""

[[tutorials]]
	name = "Data structures"
	[[tutorials.section]]
	name = "Getting started with AnnData"
	url = "https://anndata-tutorials.readthedocs.io/en/latest/getting-started.html"
	img = "../../img/libs/anndata_schema.svg"
	[[tutorials.section]]
	name = "MuData Quickstart"
	url = "https://mudata.readthedocs.io/en/latest/notebooks/quickstart_mudata.html"
	img = "../../img/libs/mudata_flat.svg"

[[tutorials]]
	name = "scRNA-seq"
	[[tutorials.section]]
	name = "Basic Analysis of PBMCs"
	url = "https://scanpy-tutorials.readthedocs.io/en/latest/pbmc3k.html"
	img = "../../img/learn/pbmc3k.webp"
	[[tutorials.section]]
	name = "Analyzing scRNA-seq with scvi-tools"
	url = "https://docs.scvi-tools.org/en/stable/tutorials/notebooks/api_overview.html"
	img = "../../img/learn/scvi-api-overview.webp"
	[[tutorials.section]]
	name = "Integration of the Lung Cell Atlas with scANVI"
	url = "https://docs.scvi-tools.org/en/stable/tutorials/notebooks/harmonization.html"
	img = "../../img/learn/lung.webp"


[[tutorials]]
	name = "Other modalities"
	[[tutorials.section]]
	name = "TCR and BCR receptor sequencing with scirpy"
	url = "https://scirpy.scverse.org/en/latest/tutorials/tutorial_3k_tcr.html"
	img = "../../img/learn/scirpy-logo.webp"
	[[tutorials.section]]
	name = "ATAC-seq"
	url = "https://muon-tutorials.readthedocs.io/en/latest/single-cell-rna-atac/pbmc10k/2-Chromatin-Accessibility-Processing.html"
	img = "../../img/learn/atac-seq.webp"
	[[tutorials.section]]
	name = "Analysis and processing of surface marker data (CITE-seq)"
	url = "https://muon-tutorials.readthedocs.io/en/latest/cite-seq/1-CITE-seq-PBMC-5k.html"
	img = "../../img/learn/cite-seq-pbmc5k.webp"

[[tutorials]]
	name="Spatial"
	[[tutorials.section]]
	name = "Analyzing 10x Visium data with squidpy"
	url = "https://squidpy.readthedocs.io/en/latest/auto_tutorials/tutorial_visium_hne.html"
	img = "../../img/learn/visium-hne.webp"
	[[tutorials.section]]
	name = "Analysis of seqFISH data with squidpy"
	url = "https://squidpy.readthedocs.io/en/stable/auto_tutorials/tutorial_seqfish.html"
	img = "../../img/learn/seqfish.webp"
	[[tutorials.section]]
	name = "Deconvolution of Visium data with DestVI"
	url = "https://docs.scvi-tools.org/en/stable/tutorials/notebooks/DestVI_tutorial.html"
	img = "../../img/learn/tissue.webp"

[[tutorials]]
	name = "scATAC-seq & scRNA-seq"
	[[tutorials.section]]
	name = "Integrating gene expression and chromatin accessibility of 10k PBMCs in muon"
	url = "https://muon-tutorials.readthedocs.io/en/latest/single-cell-rna-atac/pbmc10k/3-Multimodal-Omics-Data-Integration.html"
	img = "../../img/learn/multimodal-integration.webp"
	[[tutorials.section]]
	name = "Joint analysis of paired and unpaired multiomic data with MultiVI"
	url = "https://docs.scvi-tools.org/en/stable/tutorials/notebooks/MultiVI_tutorial.html"
	img = "../../img/learn/chromosome.webp"

[[tutorials]]
	name = "CITE-seq"
	[[tutorials.section]]
	name = "Multi-omics integration in muon"
	url = "https://muon-tutorials.readthedocs.io/en/latest/cite-seq/2-CITE-seq-PBMC-5k-Weighted-Neighbours.html"
	img = "../../img/learn/cite-seq-weighted-neighbours.webp"
	[[tutorials.section]]
	name = "CITE-seq analysis with totalVI"
	url = "https://docs.scvi-tools.org/en/stable/tutorials/notebooks/totalVI.html"
	img = "../../img/learn/protein.webp"

[[tutorials]]
	name = "Other topics"
	[[tutorials.section]]
	name = "Plotting in scanpy"
	url = "https://scanpy-tutorials.readthedocs.io/en/latest/plotting/core.html"
	img = "../../img/learn/scanpy-plotting.webp"

	[[tutorials.section]]
	name = "Combining AnnData objects"
	url = "https://anndata.scverse.org/page/concatenation.html"
	img = "../../img/libs/anndata_schema.svg"

+++
