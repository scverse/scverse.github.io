+++
title = "gget joins the scverse ecosystem"
date = 2026-06-30T00:00:05+01:00
description = "gget adds programmatic access to genomic reference databases to the scverse ecosystem."
author = "Muskan Hashim, Laura Luebbert"
draft = false
+++

Querying genomic reference databases is something every bioinformatician does constantly, and doing it well has historically required juggling a patchwork of APIs, file formats, and web interfaces. [gget](https://github.com/scverse/gget) was built to fix that, and is now officially part of the scverse ecosystem.

## What is gget?

gget is a Python package and command-line tool for programmatic access to biological databases. It was published in [*Bioinformatics* in 2023](https://academic.oup.com/bioinformatics/article/39/1/btac836/6971843) from the Pachter Lab at Caltech, and provides a unified interface to more than 20 reference databases through a consistent API.

gget was designed with one key idea in mind: one package and import should allow the user to query databases such as Ensembl, UniProt, NCBI, UCSC, AlphaFold, CellxGene, Enrichr, ARCHS4, Open Targets, COSMIC, cBioPortal, and more, without switching to a web browser or writing database-specific boilerplate.

Here's what the standard gget installation and workflow looks like:

```py
import gget

# Search Ensembl for a gene by keyword
results = gget.search("BRCA2", "homo_sapiens")

# Fetch detailed annotation, sequences, and cross-references
info = gget.info("ENSG00000139618")

# Get the amino acid sequence
seq = gget.seq("ENSG00000139618", translate=True)

# Run functional enrichment on a marker gene list
gget.enrichr(["BRCA1", "TP53", "PTEN", "ATM"], database="KEGG_2021_Human")
```

The same commands also work from the terminal:

```shell
gget search BRCA2 -s homo_sapiens
gget info ENSG00000139618
gget enrichr BRCA1 TP53 PTEN ATM --database KEGG_2021_Human
```

## What does this mean for scverse and gget users?

Analyses built on scverse tools can be the starting point for biological interpretation. For example, after clustering with [Scanpy](https://scanpy.readthedocs.io/) and identifying marker genes, you might want to understand what those genes do, how they are expressed across tissues, whether they are associated with disease, and how their protein products are structured. Without tooling answering these questions means leaving Python and visiting several web portals.

gget closes that loop and is designed for exactly the questions arising at the end of a scverse analysis. It returns results in formats that fit back into the analysis environment.

```py
import scanpy as sc
import gget

# Load and process single-cell data
adata = sc.read_h5ad("my_data.h5ad")
sc.pp.normalize_total(adata)
sc.pp.log1p(adata)
sc.tl.rank_genes_groups(adata, groupby="cell_type")

# Pull the top marker genes for a cluster
markers = sc.get.rank_genes_groups_df(adata, group="T cells")["names"].tolist()[:20]

# gget.info() requires Ensembl IDs
# Use gget.search() to resolve symbols to IDs first
search_results = gget.search(markers, "homo_sapiens")
ensembl_ids = search_results["ensembl_id"].tolist()
gget.info(ensembl_ids)

# Run enrichment
gget.enrichr(markers, database="GO_Biological_Process_2023")

# Fetch expression across human tissues from ARCHS4
gget.archs4(markers[0], which="tissue")
```

The `gget.cellxgene` module returns data as [AnnData](https://anndata.readthedocs.io/) objects helping slot results directly into scverse pipelines:

```py
# gget.cellxgene needs a one-time setup to install the cellxgene-census backend
gget.setup("cellxgene")

# Query CellxGene for pancreatic data and get back an AnnData object
adata = gget.cellxgene(
    tissue="pancreas",
    cell_type="pancreatic ductal cell",
    gene=["INS", "GCG", "SST"],
    census_version="stable"
)

# Run standard preprocessing before plotting
sc.pp.pca(adata)
sc.pp.neighbors(adata)
sc.tl.umap(adata)
sc.pl.umap(adata, color="cell_type")
```

## Alignment with the scverse mission

scverse is a modular, open, and interoperable foundation for biology.
Individual packages focus on what they do best, use shared data structures, and compose naturally with one another. 
The addition of gget to our ecosystem complements our existing tooling by interoperating with the most widely used metadata & dataset databases.

Someone studying spatial transcriptomics with Squidpy may want to fetch ligand-receptor protein structures from PDB, or pull disease associations from Open Targets, or BLAST a sequence of interest. The integration of gget makes each of those a one-liner by being the layer helping you handle external reference databases alongside those analyses.

The modular principle also applies to gget itself. Each database integration is a separate module, so the package is lightweight and dependencies are opt-in.

## What joining the scverse ecosystem means

For gget, joining scverse means adopting shared community infrastructure: the [scverse package template](https://github.com/scverse/cookiecutter-scverse), continuous integration conventions, as well as the documentation and testing practices the ecosystem shares. It also means participating in the same community spaces where the broader ecosystem is discussed and developed.

For users, it means gget is where you would expect to find it: listed as one of our ecosystem packages at [scverse.org/packages](https://scverse.org/packages), discussed in the [scverse Zulip](https://scverse.zulipchat.com/) and [Discourse](https://discourse.scverse.org/), and maintained with the same expectations of quality and openness that apply across the ecosystem.

## Get started

gget is available via PyPI or uv:

```shell
pip install gget
```

```shell
uv pip install gget
```

The [documentation](https://scverse.org/gget/) covers all modules with worked examples. The [GitHub repository](https://github.com/scverse/gget) is the best place to report issues, propose new database integrations, or contribute.

If you are already using scverse tools for single-cell analysis, gget is a natural addition to your environment. And if you are new to the ecosystem, [scverse.org](https://scverse.org) is the place to start.

We are glad to have gget in the family.

*— the scverse team.*

---

*gget is an open-source, community-developed tool. Contributions are welcome via the [GitHub repository](https://github.com/scverse/gget).* 
