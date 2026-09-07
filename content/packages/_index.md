+++
title = "Packages"
description = "The scverse core packages — data structures and analysis frameworks — and the wider ecosystem of community-maintained tools built on them."
aliases = ["/projects/"]

[[sections]]
	core_packages = "These packages are considered foundational in that many other packages build upon them. Joint maintenance by the core team guarantees long-term stability."
	datastructures = """\
Data structures are the foundational building block for all scverse packages.
Building upon common data structures ensures interoperability.
The on-disk formats are language-agnostic as well: each can be read from R, Julia, and other languages, as listed on the interoperability pages linked below."""
	datastructures_post = "In addition to these packages, we define standards on how to represent certain data types in these data structures. For now, such a specification is available for [Adaptive Immune Receptor Repertoire (AIRR) data](https://scirpy.scverse.org/en/latest/data-structure.html#storing-airr-rearrangement-data-in-anndata)."
	frameworks = "Frameworks provide essential algorithms and plotting functions for specific analysis steps, building on our data structures."
	ecosystem = "Many popular packages rely on scverse functionality. For instance, they take advantage of established data format standards such as AnnData and MuData, or are designed to be integrated into the workflow of analysis frameworks. Here, we list ecosystem packages following development best practices (continuous testing, documented, available through standard distribution tools).\n\n *See [scverse/ecosystem-packages](https://github.com/scverse/ecosystem-packages) for inclusion criteria, and to submit more packages.*"


# The registry schema has no interoperability field, so the core data structures map theirs here.
# Keys are the registry's package name, lowercased.
[interoperability]
	anndata = "https://anndata.scverse.org/en/stable/interoperability.html"
	mudata = "https://mudata.readthedocs.io/stable/interoperability.html"
	spatialdata = "https://spatialdata.scverse.org/en/latest/interoperability.html"

+++
