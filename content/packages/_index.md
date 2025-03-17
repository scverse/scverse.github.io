+++
title = "Packages"
aliases = ["/projects/"]

[[sections]]
	core_packages = "These packages are considered foundational in that many other packages build upon them. Joint maintenance by the core team guarantees long-term stability."
	datastructures = "Data structures are the foundational building block for all scverse packages. Building upon common data structures ensures interoperability."
	datastructures_post = "In addition to these packages, we define standards on how to represent certain data types in these data structures. For now, such a specification is available for [Adaptive Immune Receptor Repertoire (AIRR) data](https://scirpy.scverse.org/en/latest/data-structure.html#storing-airr-rearrangement-data-in-anndata). Representations for other data types (e.g. scATAC-seq) will follow."
	frameworks = ""
	ecosystem = "Many popular packages rely on scverse functionality. For instance, they take advantage of established data format standards such as AnnData and MuData, or are designed to be integrated into the workflow of analysis frameworks. Here, we list ecosystem packages following development best practices (continuous testing, documented, available through standard distribution tools).\n\n *This listing is a work in progress. See [scverse/ecosystem-packages](https://github.com/scverse/ecosystem-packages) for inclusion criteria, and to submit more packages.*"

[[datastructures]]
	name = "anndata"
	description = "Standard for annotated matrices"
	url = "https://anndata.readthedocs.io/en/latest/"
	img = "../img/libs/anndata_schema.svg"
	details = "AnnData is a Python package for handling annotated data matrices in memory and on disk, positioned between pandas and xarray. anndata offers a broad range of computationally efficient features including, among others, sparse data support, lazy operations, and a PyTorch interface."
	[[datastructures.links]]
	text = "GitHub"
	url = "https://github.com/theislab/anndata"
	[[datastructures.links]]
	text = "Documentation"
	url = "https://anndata.readthedocs.io/en/latest/"
	[[datastructures.links]]
	text = "PyPI"
	url = "https://pypi.org/project/anndata/"
	[[datastructures.links]]
	text = "Conda"
	url = "https://anaconda.org/conda-forge/anndata"

[[datastructures]]
	name = "mudata"
	description = "Multimodal data format"
	url = "https://mudata.readthedocs.io/en/latest/"
	img = "../img/libs/mudata_flat.svg"
	details = "MuData is a format for annotated multimodal datasets where each modality is represented by an AnnData object. MuData's reference implementation is in Python, and the cross-language functionality is achieved via HDF5-based .h5mu files with libraries in R and Julia."
	[[datastructures.links]]
	text = "GitHub"
	url = "https://github.com/scverse/mudata"
	[[datastructures.links]]
	text = "Documentation"
	url = "https://mudata.readthedocs.io/en/latest/"
	[[datastructures.links]]
	text = "PyPI"
	url = "https://pypi.org/project/mudata/"
	[[datastructures.links]]
	text = "Conda"
	url = "https://anaconda.org/conda-forge/mudata"
	[[datastructures.links]]
	text = "Muon.jl"
	url = "https://github.com/scverse/Muon.jl"

[[datastructures]]
	name = "spatialdata"
	description = "Data format for data with spatial resolution"
	url = "https://spatialdata.scverse.org/en/latest/"
	img = "../img/icons/spatialdata.svg"
	details = "SpatialData is a data framework that comprises a FAIR storage format and a collection of python libraries for performant access, alignment, and processing of uni- and multi-modal spatial omics datasets. This repository contains the core spatialdata library. See the links below to learn more about other packages in the SpatialData ecosystem."
	[[datastructures.links]]
	text = "GitHub"
	url = "https://github.com/scverse/spatialdata"
	[[datastructures.links]]
	text = "Documentation"
	url = "https://spatialdata.scverse.org/en/latest/"
	[[datastructures.links]]
	text = "PyPI"
	url = "https://pypi.org/project/spatialdata/"
	[[datastructures.links]]
	text = "spatialdata-io"
	url = "https://github.com/scverse/spatialdata-io"


[[packages]]
	name = "scanpy"
	description = "Single-cell analysis framework"
	url = "https://scanpy.readthedocs.io/en/latest/"
	#img = "https://scanpy.readthedocs.io/en/stable/_static/Scanpy_Logo_BrightFG.svg"
	img = "../img/icons/scanpy.svg"
	details = "Scanpy is a scalable toolkit for analyzing single-cell gene expression data built jointly with anndata. It includes preprocessing, visualization, clustering, trajectory inference and differential expression testing. The Python-based implementation efficiently deals with datasets of more than one million cells."
	[[packages.links]]
	text = "GitHub"
	url = "https://github.com/theislab/scanpy"
	[[packages.links]]
	text = "Documentation and tutorials"
	url = "https://scanpy.readthedocs.io/en/latest/"
	[[packages.links]]
	text = "PyPI"
	url = "https://pypi.org/project/scanpy/"
	[[packages.links]]
	text = "Conda"
	url = "https://anaconda.org/conda-forge/scanpy"

[[packages]]
	name = "muon"
	description = "Multi-omics analysis framework"
	url = "https://gtca.github.io/muon"
	#img = "https://muon.readthedocs.io/en/latest/_static/muon_logo.png"
	img = "../img/icons/muon.svg"
	details = "muon is a Python framework for multimodal omics analysis. While there are many features that muon brings to the table, there are three key areas that its functionality is focused on."
	[[packages.links]]
	text = "GitHub"
	url = "https://github.com/scverse/muon"
	[[packages.links]]
	text = "Documentation"
	url = "https://muon.readthedocs.io/en/latest/"
	[[packages.links]]
	text = "Tutorials"
	url = "https://muon-tutorials.readthedocs.io/en/latest/"
	[[packages.links]]
	text = "PyPI"
	url = "https://pypi.org/project/muon/"
	[[packages.links]]
	text = "Website"
	url = "https://muon.scverse.org/"

[[packages]]
	name = "scvi-tools"
	description = "Machine learning model development library and model zoo"
	url = "https://scvi-tools.org/"
	img = "../img/libs/scvi_tools_graph_model.svg"
	details = "scvi-tools is a library for developing and deploying machine learning models based on PyTorch and AnnData. With an emphasis on probablistic models, scvi-tools steamlines the development process via training, data management, and user interface abstractions. scvi-tools also contains easy-to-use implementations of more than 14 state-of-the-art probabilistic models in the field."
	[[packages.links]]
	text = "GitHub"
	url = "https://github.com/yoseflab/scvi-tools"
	[[packages.links]]
	text = "Documentation and tutorials"
	url = "https://docs.scvi-tools.org/en/stable/"
	[[packages.links]]
	text = "PyPI"
	url = "https://pypi.org/project/scvi-tools/"
	[[packages.links]]
	text = "Website"
	url = "https://scvi-tools.org/"

[[packages]]
	name = "scirpy"
	description = "Single-cell immune sequencing framework"
	url = "https://scirpy.scverse.org"
	img = "../img/icons/scirpy.svg"
	details = "Scirpy is a scalable toolkit to analyse T-cell receptor or B-cell receptor repertoires from single-cell RNA sequencing data. It seamlessly integrates with scanpy and provides various modules for data import, analysis and visualization."
	[[packages.links]]
	text = "GitHub"
	url = "https://github.com/icbi-lab/scirpy"
	[[packages.links]]
	text = "Documentation and tutorials"
	url = "https://scirpy.scverse.org/"
	[[packages.links]]
	text = "PyPI"
	url = "https://pypi.org/project/scirpy/"
	[[packages.links]]
	text = "Conda"
	url = "https://anaconda.org/bioconda/scirpy"

[[packages]]
	name = "squidpy"
	description = "Spatial Single Cell Analysis"
	url = "https://squidpy.readthedocs.io/"
	img = "../img/icons/squidpy.svg"
	details = "Squidpy is a tool for the analysis and visualization of spatial molecular data. It builds on top of scanpy and anndata, from which it inherits modularity and scalability. It provides analysis tools that leverages the spatial coordinates of the data, as well as tissue images if available."
	[[packages.links]]
	text = "GitHub"
	url = "https://github.com/theislab/squidpy"
	[[packages.links]]
	text = "Documentation and tutorials"
	url = "https://squidpy.readthedocs.io/"
	[[packages.links]]
	text = "PyPI"
	url = "https://pypi.org/project/squidpy/"


+++
