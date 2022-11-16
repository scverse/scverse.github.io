+++
title = "scverse"
description = "Foundational tools for single-cell omics data analysis"

# Packages

[[packages]]
	name = "anndata"
	description = "Standard for annotated matrices"
	url = "https://anndata.readthedocs.io/en/latest/"

[[packages]]
	name = "mudata"
	description = "Multimodal data format"
	url = "https://mudata.readthedocs.io/en/latest/"

[[packages]]
	name = "scanpy"
	description = "Single-cell analysis framework"
	url = "https://scanpy.readthedocs.io/en/latest/"

[[packages]]
	name = "muon"
	description = "Multi-omics analysis framework"
	url = "https://gtca.github.io/muon"

[[packages]]
	name = "scvi-tools"
	description = "Single-cell machine learning framework"
	url = "https://scvi-tools.org/"

[[packages]]
	name = "scirpy"
	description = "Single-cell immune sequencing analysis framework"
	url = "https://icbi-lab.github.io/scirpy/latest/"

[[packages]]
	name = "squidpy"
	description = "Spatial single cell analysis"
	url = "https://squidpy.readthedocs.io/"

# Mission

[mission]

text = """\
**scverse** is a consortium of foundational tools (mostly in Python) for omics data in life sciences. It has been founded to ensure the long-term maintenance of these core tools."""

# Team

[team]

text = """\
**scverse** is a community project currently governed by the developers of the core packages. Please [reach out](/join) if you'd like to be involved!
"""

# People information is recorded in the people/_index.md file


# References
[references]

text = """\
**scverse** tools are used in numerous research and industry projects across the globe and are referenced in [thousands](https://scholar.google.ru/scholar?cites=14568046068402025757) of academic publications. Consider consulting the following references for more information about core **scverse** libraries and citing the relevant articles when using them in your work:
"""

[[references.citations]]
	id = "scanpy"
	url = "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-017-1382-0"
	text = "Wolf F, Angerer P, Theis FJ. SCANPY: large-scale single-cell gene expression data analysis. Genome Biol 19, 15 (2018)"

[[references.citations]]
    id = "muon"
    url = "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-021-02577-8"
    text = "Bredikhin D, Kats I, Stegle O. MUON: multimodal omics analysis framework. Genome Biol 23, 42 (2022)"

[[references.citations]]
    id = "anndata"
    url = "https://www.biorxiv.org/content/10.1101/2021.12.16.473007"
    text = "Virshup I, Rybakov S, Theis FJ, Angerer P, Wolf FA. anndata: Annotated data. bioRxiv. 2021 Dec 19."

[[references.citations]]
    id = "scvi-tools"
    url = "https://www.nature.com/articles/s41587-021-01206-w"
    text = "Gayoso A, Lopez R, Xing G, Boyeau P, Valiollah Pour Amiri V, Hong J, Wu K, Jayasuriya M, Mehlman E, Langevin M, Liu Y. A Python library for probabilistic analysis of single-cell omics data. Nature Biotechnology. 2022 Feb 7:1-4."

[[references.citations]]
    id = "scirpy"
    url = "https://academic.oup.com/bioinformatics/article/36/18/4817/5866543"
    text = "Sturm G, Szabo T, Fotakis G, Haider M, Rieder D, Trajanoski Z, Finotello F. Scirpy: a Scanpy extension for analyzing single-cell T-cell receptor-sequencing data. Bioinformatics. 2020 Sep 15;36(18):4817-8."

[[references.citations]]
    id = "Squidpy"
    url = "https://doi.org/10.1038/s41592-021-01358-2"
    text = "Palla G, Spitzer H, Klein M, Fischer D, Schaar AC, Kuemmerle LB, Rybakov S, Ibarra IL, Holmberg O, Virshup I, Lotfollahi M, Richter S, Theis FJ. Squidpy: a scalable framework for spatial omics analysis. Nat Methods 19, 171–178 (2022)."

+++
