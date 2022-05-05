+++
title = "Hello world"
date = 2022-04-04T14:28:05+01:00
description = "Introducing scverse"
draft = false
+++

Due to the increasing reliance of scientific research on complex computational pipelines, foundational software in the life sciences has outgrown individual labs and institutes in terms of its scale and impact. This has motivated us to start something more than a code repository for an exciting new project – a new organisation to maintain and support foundational tools in the life sciences in the Python ecosystem. We are therefore very excited to announce **scverse** – a consortium for joint development of major packages in omics data analysis in life sciences.

## What tools are part of scverse?

Our primary experience lies in the field of computational biology with an emphasis on single-cell omics technologies. This experience has defined our initial scope and focus in the very beginning of our journey. Hence, we start with the two most important data structures for single-cell data in the Python ecosystem, [AnnData](https://github.com/scverse/anndata) for uni-modal data and [MuData](https://github.com/scverse/mudata) for multi-modal data, together with [Scanpy](https://github.com/scverse/scanpy) for general purpose single-cell analysis, [muon](https://github.com/scverse/muon) for multimodal single-cell analysis, [scvi-tools](https://github.com/scverse/scvi-tools) for deep probabilistic analysis of single-cell data and [scirpy](https://github.com/scverse/scirpy) for T-cell receptor analysis. We are looking forward to expanding with more major libraries and frameworks which fit our vision soon.

## What are we doing?

Our first priority is to build a strong and lasting community around the tools and the associated analysis. The knowledge to build and maintain our tools should be shared among many to avoid single points of failures. Therefore, we are building tooling to more easily generate scverse based packages and analyses to grow the ecosystem. Furthermore, to bring the community together we are planning workshops and hackathons which will be open to the general community. We are also hoping that a healthy scverse community will naturally guide us to develop tooling where it is the most required.

There are already a few visible outcomes of our joint work including improved 
[mudata performance](https://mudata.readthedocs.io/en/latest/changelog.html#v0-1-2) and
[mudata documentation](https://mudata.readthedocs.io/en/latest/). Additionally, 
[scvi-tools is now using MuData](https://github.com/scverse/scvi-tools/pull/1444) for the representation of multimodal data. 
[Scanpy has gained new workshop notebooks](https://github.com/scverse/scanpy-tutorials/pull/52), and, moreover, we have started 
[a new page with tutorials for scverse libraries](https://scverse.org/tutorials/).

## Who is a part of scverse?

`scverse` is explicitly an effort beyond just a single research group.
As a community effort we ensure continued interoperablility, promote growth, and increase our bus number. 
In our initial form, we have divided responsibilities into several [roles](https://scverse.org/people/), including:

[Isaac Virshup](https://github.com/ivirshup), [Danila Bredikhin](https://github.com/gtca) and [Lukas Heumos](https://github.com/Zethson) form the steering committee and also belong to the core developers together with [Adam Gayoso](https://github.com/adamgayoso), [Giovanni Palla](https://github.com/giovp), [Gregor Sturm](https://github.com/grst), and [Ilia Kats](https://github.com/ilia-kats). The core developers have made significant contributions to the ecosystem and are jointly developing and maintaining the major libraries.

Our management committee, consisting of [Fabian Theis](https://www.helmholtz-munich.de/icb/institute/staff/staff/ma/2494/index.html), [Oliver Stegle](https://www.embl.org/groups/stegle/), [Nir Yosef](https://yoseflab.github.io/), [Alex Wolf](https://falexwolf.me/) and [Francesca Finotello](https://computationalbiomedicinegroup.github.io/), are providing resources and academic freedom to scverse to develop our tools.

[Aviv Regev](https://biology.mit.edu/profile/aviv-regev/), [Sarah Teichmann](https://www.sanger.ac.uk/group/teichmann-group/), [Dana Pe'er](https://www.mskcc.org/research/ski/labs/dana-pe-er) and [Bonnie Berger](https://people.csail.mit.edu/bab/) are our scientific advisory board which helps shaping the overall vision and defining the right priorities.

## How can I join and contribute?

We're particularly excited about the community coming together for this effort with so many brilliant people involved who design tools, write code, manage and analyse data and visualise results. Please ask usage questions on [our Discourse forum](https://discourse.scverse.org/), developer questions on [our scverse Zulip](https://scverse.zulipchat.com/) and make sure to [follow us on Twitter](https://twitter.com/scanpy_team) to keep track of scverse updates.
scverse is very much open to contributions in all areas by **everyone**.
We strongly believe in diversity of all kinds being a requirement and a strong benefit for a healthy community. Hence, we embrace people from all backgrounds and experiences, who challenge each other’s assumptions with fresh perspectives. We’re committed to fair treatment and access for all members of the scverse community which is reflected in our [code of conduct](https://github.com/scverse/governance/blob/main/CODE_OF_CONDUCT.md). A sense of belonging is important to us, so we strive to actively foster a community where everyone is and feels welcomed, respected, supported, and valued. We want to especially encourage people from underrepresented backgrounds to contribute and to reach out.
