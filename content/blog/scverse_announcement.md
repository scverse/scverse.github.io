+++
title = "scverse Announcement"
date = 2022-01-19T14:28:05+01:00
description = "Introducing scverse"
draft = false
+++

With the increasing reliance of scientific research on infrastructural and analytical software, foundational tools in life sciences have outgrown individual labs and institutes in terms of their scale and impact. That has encouraged us to start something more than a code repository for an exciting new project – we are starting a new organisation to maintain and support foundational tools in the life sciences in the Python ecosystem.

Our primary experience lies in the field of computational genomics and lately single-cell sequencing technologies, and this has defined our initial scope and focus in the very beginning of our journey. We are excited to announce **scverse** a consortium for joint maintenance of core packages in omics data analysis in life sciences.

## Who is a part of scverse?

scverse is explicitly an effort beyond just a single research group. Only together can we continue to ensure that the ecosystem grows and stays interoperable.
We therefore define several roles of which only the most relevant are denoted here:

**Isaac Virshup**, **Danila Bredikhin** and **Lukas Heumos**, who are also a part of the steering committee, belong to the core developers together with **Adam Gayoso**, **Giovanni Palla**, **Gregor Sturm**, and **Ilia Kats**. The core developers have made significant contributions to the ecosystem and are jointly developing and maintaining the major libraries.

Our management committee, consisting of **Fabian Theis**, **Oliver Stegle**, **Nir Yosef**, **Alex Wolf** and **Francesca Finotello**, are providing resources and academic freedom to scverse to develop our tools.

**Aviv Regev**, **Sarah Teichmann**, **Dana Pe'er** and **Bonnie Berger** are our scientific advisory board which defines the overall vision and determines the most important needs.

## What tools does scverse maintain?

We start with the two most important data structures, [AnnData](https://github.com/scverse/anndata) and [MuData](https://github.com/scverse/mudata), together with [Scanpy](https://github.com/scverse/scanpy) for general purpose single-cell analysis, [Muon](https://github.com/scverse/muon) for multimodal single-cell analysis, [scvi-tools](https://github.com/scverse/scvi-tools) for deep probabilistic analysis of single-cell data and [scirpy](https://github.com/scverse/scirpy) for T-cell receptor analysis. We are planning to expand very soon and are actively looking for major libraries and frameworks which fit our vision.

## What are we doing?

While we're continuing to work on the scverse libraries and frameworks, we're trying to improve how they work and are tested together. Hence, we are looking into the development of infrastructure which cross tests release candidates of our tools. Further, we are building tooling to more easily generate scverse based packages and analyses to grow the ecosystem. Beyond technical challenges we are looking to build a community around scverse with for example hackathons and to teach the community our tools with workshops.

There are already a few visible outcomes of our joint work including improved [mudata performance](https://mudata.readthedocs.io/en/latest/changelog.html#v0-1-2)
and [mudata documentation](https://mudata.readthedocs.io/en/latest/). Additionally, [scvi-tools is now using MuData](https://github.com/scverse/scvi-tools/pull/1444) for the representation of multimodal data.

## How can I join and contribute?

We're particularly excited about the community coming together for this effort with so many brilliant people involved who design tools, write code, manage and analyse data and visualise results. Please ask usage questions on [our joint discourse](https://discourse.scverse.org/) and make sure to [follow us on Twitter](https://twitter.com/scanpy_team) to keep track of scverse updates.
scverse is very much open to contributions in all areas by **everyone**. If you are maintaining a major library or framework which aligns with our vision and can be build upon by others, please contact us. We are actively looking to diversify our members and want to especially encourage people from underrepresented backgrounds to reach out.

## How to contact us

We are very active on our [scverse Zulip](https://scverse.zulipchat.com/). Feel free to join, to say hi and to talk to us.
