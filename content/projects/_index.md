+++
title = "Projects"

[[projects]]
	name = "anndata"
	description = "Standard for annotated matrices"
	url = "https://anndata.readthedocs.io/en/latest/"
	img = "../img/libs/anndata_schema.svg"
	details = "Anndata is a Python package for handling annotated data matrices in memory and on disk, positioned between pandas and xarray. anndata offers a broad range of computationally efficient features including, among others, sparse data support, lazy operations, and a PyTorch interface."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/theislab/anndata"
	[[projects.links]]
	text = "Documentation"
	url = "https://anndata.readthedocs.io/en/latest/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/anndata/"
	[[projects.links]]
	text = "Conda"
	url = "https://anaconda.org/conda-forge/anndata"

[[projects]]
	name = "mudata"
	description = "Multimodal data format"
	url = "https://mudata.readthedocs.io/en/latest/"
	img = "../img/libs/mudata_flat.svg"
	details = "MuData is a format for annotated multimodal datasets where each modality is represented by an AnnData object. MuData's reference implementation is in Python, and the cross-language functionality is achieved via HDF5-based .h5mu files with libraries in R and Julia."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/scverse/mudata"
	[[projects.links]]
	text = "Documentation"
	url = "https://mudata.readthedocs.io/en/latest/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/mudata/"
	[[projects.links]]
	text = "Conda"
	url = "https://anaconda.org/conda-forge/mudata"
	[[projects.links]]
	text = "Muon.jl"
	url = "https://github.com/scverse/Muon.jl"

[[projects]]
	name = "scanpy"
	description = "Single-cell analysis framework"
	url = "https://scanpy.readthedocs.io/en/latest/"
	#img = "https://scanpy.readthedocs.io/en/stable/_static/Scanpy_Logo_BrightFG.svg"
	img = "../img/icons/scanpy.svg"
	details = "Scanpy is a scalable toolkit for analyzing single-cell gene expression data built jointly with anndata. It includes preprocessing, visualization, clustering, trajectory inference and differential expression testing. The Python-based implementation efficiently deals with datasets of more than one million cells."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/theislab/scanpy"
	[[projects.links]]
	text = "Documentation and tutorials"
	url = "https://scanpy.readthedocs.io/en/latest/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/scanpy/"
	[[projects.links]]
	text = "Conda"
	url = "https://anaconda.org/conda-forge/scanpy"

[[projects]]
	name = "muon"
	description = "Multi-omics analysis framework"
	url = "https://gtca.github.io/muon"
	#img = "https://muon.readthedocs.io/en/latest/_static/muon_logo.png"
	img = "../img/icons/muon.svg"
	details = "muon is a Python framework for multimodal omics analysis. While there are many features that muon brings to the table, there are three key areas that its functionality is focused on."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/scverse/muon"
	[[projects.links]]
	text = "Documentation"
	url = "https://muon.readthedocs.io/en/latest/"
	[[projects.links]]
	text = "Tutorials"
	url = "https://muon-tutorials.readthedocs.io/en/latest/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/muon/"
	[[projects.links]]
	text = "Website"
	url = "https://gtca.github.io/muon/"

[[projects]]
	name = "scvi-tools"
	description = "Machine learning model development library and model zoo"
	url = "https://scvi-tools.org/"
	img = "../img/libs/scvi_tools_graph_model.svg"
	details = "scvi-tools is a library for developing and deploying machine learning models based on PyTorch and AnnData. With an emphasis on probablistic models, scvi-tools steamlines the development process via training, data management, and user interface abstractions. scvi-tools also contains easy-to-use implementations of more than 14 state-of-the-art probabilistic models in the field."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/yoseflab/scvi-tools"
	[[projects.links]]
	text = "Documentation and tutorials"
	url = "https://docs.scvi-tools.org/en/stable/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/scvi-tools/"
	[[projects.links]]
	text = "Website"
	url = "https://scvi-tools.org/"

[[projects]]
	name = "scirpy"
	description = "Single-cell immune sequencing framework"
	url = "https://icbi-lab.github.io/scirpy/stable/"
	img = "../img/icons/scirpy.svg"
	details = "Scirpy is a scalable toolkit to analyse T-cell receptor or B-cell receptor repertoires from single-cell RNA sequencing data. It seamlessly integrates with scanpy and provides various modules for data import, analysis and visualization."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/icbi-lab/scirpy"
	[[projects.links]]
	text = "Documentation and tutorials"
	url = "https://icbi-lab.github.io/scirpy/latest/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/scirpy/"
	[[projects.links]]
	text = "Conda"
	url = "https://anaconda.org/bioconda/scirpy"

[[projects]]
	name = "squidpy"
	description = "Spatial Single Cell Analysis"
	url = "https://squidpy.readthedocs.io/"
	img = "../img/icons/squidpy.svg"
	details = "Squidpy is a tool for the analysis and visualization of spatial molecular data. It builds on top of scanpy and anndata, from which it inherits modularity and scalability. It provides analysis tools that leverages the spatial coordinates of the data, as well as tissue images if available."
	[[project.links]]
	text = "GitHub"
	url = "https://github.com/theislab/scirpy"
		[[projects.links]]
	text = "Documentation and tutorials"
	url = "https://squidpy.readthedocs.io/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/squidpy/"

[[ecosystem]]
	text = "Many popular packages rely on scverse functionality. For instance, they take advantage of established data format standards such as anndata and mudata, or are designed to be integrated into the workflow of analysis frameworks. Here are just a few of them."
	[[ecosystem.libs]]
	name = "bbknn"
	url = "https://github.com/Teichlab/bbknn"
	[[ecosystem.libs]]
	name = "cell2location"
	url = "https://cell2location.readthedocs.io"
	[[ecosystem.libs]]
	name = "CellBender"
	url = "https://github.com/broadinstitute/CellBender"
	[[ecosystem.libs]]
	name = "CellOracle"
	url = "https://morris-lab.github.io/CellOracle.documentation/"
	[[ecosystem.libs]]
	name = "CellPhoneDB"
	url = "https://github.com/Teichlab/cellphonedb"
	[[ecosystem.libs]]
	name = "CellRank"
	url = "https://github.com/theislab/cellrank"
	[[ecosystem.libs]]
	name = "cellxgene"
	url = "https://github.com/chanzuckerberg/cellxgene"
	[[ecosystem.libs]]
	name = "cellxgene_VIP"
	url = "https://github.com/interactivereport/cellxgene_VIP"
	[[ecosystem.libs]]
	name = "Cell_BLAST"
	url = "https://github.com/gao-lab/Cell_BLAST"
	[[ecosystem.libs]]
	name = "Cirrocumulus"
	url = "https://cirrocumulus.readthedocs.io/en/latest/"
	[[ecosystem.libs]]
	name = "cNMF"
	url = "https://github.com/dylkot/cNMF"
	[[ecosystem.libs]]
	name = "CPA"
	url = "https://github.com/facebookresearch/CPA"
	[[ecosystem.libs]]
	name = "dca"
	url = "https://github.com/theislab/dca"
	[[ecosystem.libs]]
	name = "decoupler"
	url = "https://github.com/saezlab/decoupler-py"
	[[ecosystem.libs]]
	name = "diffxpy"
	url = "https://github.com/theislab/diffxpy"
	[[ecosystem.libs]]
	name = "DoubletDetection"
	url = "https://github.com/JonathanShor/DoubletDetection"
	[[ecosystem.libs]]
	name = "dynamo-release"
	url = "https://github.com/aristoteleo/dynamo-release"
	[[ecosystem.libs]]
	name = "epiScanpy"
	url = "https://github.com/colomemaria/epiScanpy"
	[[ecosystem.libs]]
	name = "scanorama"
	url = "http://cb.csail.mit.edu/cb/scanorama/"
	[[ecosystem.libs]]
	name = "SnapATAC2"
	url = "https://github.com/kaizhang/SnapATAC2"
	[[ecosystem.libs]]
	name = "MARS"
	url = "https://github.com/snap-stanford/mars"
	[[ecosystem.libs]]
	name = "novoSpaRc"
	url = "https://novosparc.readthedocs.io"
	[[ecosystem.libs]]
	name = "Open Problems"
	url = "https://openproblems.bio"
	[[ecosystem.libs]]
	name = "PathML"
	url = "https://pathml.org"
	[[ecosystem.libs]]
	name = "Palantir"
	url = "https://github.com/dpeerlab/Palantir"
	[[ecosystem.libs]]
	name = "PASTE"
	url = "https://github.com/raphael-group/paste"
	[[ecosystem.libs]]
	name = "pegasus"
	url = "https://pegasus.readthedocs.io/en/stable/"
	[[ecosystem.libs]]
	name = "pySCENIC"
	url = "https://github.com/aertslab/pySCENIC"
	[[ecosystem.libs]]
	name = "scCODA"
	url = "https://sccoda.readthedocs.io/en/latest/"
	[[ecosystem.libs]]
	name = "scArches"
	url = "https://github.com/theislab/scarches"
	[[ecosystem.libs]]
	name = "scGen"
	url = "https://github.com/theislab/scgen"
	[[ecosystem.libs]]
	name = "scrublet"
	url = "https://github.com/swolock/scrublet"
	[[ecosystem.libs]]
	name = "scvelo"
	url = "https://github.com/theislab/scvelo"
	[[ecosystem.libs]]
	name = "sfaira"
	url = "https://github.com/theislab/sfaira"
	[[ecosystem.libs]]
	name = "SpaGCN"
	url = "https://github.com/jianhuupenn/SpaGCN"
	[[ecosystem.libs]]
	name = "squidpy"
	url = "https://github.com/theislab/squidpy"
	[[ecosystem.libs]]
	name = "Tangram"
	url = "https://tangram-sc.readthedocs.io/en/latest/index.html"
	[[ecosystem.libs]]
	name = "vitesse"
	url = "https://github.com/vitessce/vitessce"
	[[ecosystem.libs]]
	name = "wot"
	url = "https://github.com/broadinstitute/wot)"
+++
