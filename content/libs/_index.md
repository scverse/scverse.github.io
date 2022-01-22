+++
title = "Packages"

[[projects]]
	name = "anndata"
	description = "Standard for annotated matrices"
	url = "https://anndata.readthedocs.io/en/latest/"
	img = "https://anndata.readthedocs.io/en/latest/_images/anndata_schema.svg"
	details = "anndata is a Python package for handling annotated data matrices in memory and on disk, positioned between pandas and xarray. anndata offers a broad range of computationally efficient features including, among others, sparse data support, lazy operations, and a PyTorch interface."
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
	img = "https://mudata.readthedocs.io/en/latest/_static/mudata.png"
	details = "MuData is a format for annotated multimodal datasets where each modality is represented by an AnnData object. MuData's reference implementation is in Python, and the cross-language functionality via HDF5-based .h5mu files with libraries in R and Julia."
	[[projects.links]]
	text = "GitHub"
	url = "https://github.com/scverse/mudata"
	[[projects.links]]
	text = "Documentation"
	url = "https://mudata.readthedocs.io/en/latest/"
	[[projects.links]]
	text = "PyPI"
	url = "https://pypi.org/project/mudata/"

[[projects]]
	name = "scanpy"
	description = "Single-cell analysis framework"
	url = "https://scanpy.readthedocs.io/en/latest/"
	img = "https://scanpy.readthedocs.io/en/stable/_static/Scanpy_Logo_BrightFG.svg"
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
	img = "https://muon.readthedocs.io/en/latest/_static/muon_logo.png"
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

+++

## Ecosystem

Many popular packages rely on scverse functionality. For instance, they take advantage of established data format standards such as anndata and mudata, or are designed to be integrated into the workflow of analysis frameworks. To name a few, check out [CellBender](https://github.com/broadinstitute/CellBender), [CellPhoneDB](https://github.com/Teichlab/cellphonedb), [CellRank](https://github.com/theislab/cellrank), [cellxgene](https://github.com/chanzuckerberg/cellxgene), [diffxpy](https://github.com/theislab/diffxpy), [dynamo-release](https://github.com/aristoteleo/dynamo-release), [epiScanpy](https://github.com/colomemaria/epiScanpy), [pySCENIC](https://github.com/aertslab/pySCENIC), [scArches](https://github.com/theislab/scarches), [scGen](https://github.com/theislab/scgen), [scvelo](https://github.com/theislab/scvelo), [scvi-tools](https://scvi-tools.org/), [sfaira](https://github.com/theislab/sfaira), [squidpy](https://github.com/theislab/squidpy), [vitesse](https://github.com/vitessce/vitessce), [wot](https://github.com/broadinstitute/wot).