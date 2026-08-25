+++
title = "Mission statement"
description = "The goals, organization and vision of the scverse consortium."

[[goals]]
	name = "Interoperability"
	icon = "bi-arrow-left-right"
	text = "We focus on developing open, standardized, and efficient file formats to encourage data sharing and re-use."

[[goals]]
	name = "Diversity"
	icon = "bi-people"
	text = "We believe in removing barriers to participation in research, including economic factors and institutional culture. Our tools will have the most impact if they are developed by and for a diverse community."

[[goals]]
	name = "Transparency"
	icon = "bi-eye"
	text = "We do our work as openly as possible and welcome our community to join the decision making process."

[[goals]]
	name = "Simplicity"
	icon = "bi-boxes"
	text = "Invent as little as possible and work with standard pydata types. We strive for easy-to-use interfaces that reduce mental overhead."

[[goals]]
	name = "Efficiency"
	icon = "bi-lightning-charge"
	text = "Our tools should require as little computational resources as possible. This makes analysis of large datasets more accessible, and makes cutting edge research possible."
[[user_support]]
	name = "Documentation"
	icon = "bi-journal-text"
	text = "Clear documentation of code and usage via docs and tutorials."

[[user_support]]
	name = "Participation"
	icon = "bi-git"
	text = "Participation in development through issues and pull requests."

[[user_support]]
	name = "Forums and chat"
	icon = "bi-chat-dots"
	text = "Our [Discourse](https://discourse.scverse.org/) and [Zulip](https://scverse.zulipchat.com/), alongside the other [ways to reach us](/join/)."

[[user_support]]
	name = "Workshops"
	icon = "bi-mortarboard"
	text = "Workshops at which we teach analysis workflows based on the scverse ecosystem."

[[developer_support]]
	name = "Stable APIs"
	icon = "bi-plug"
	text = "Providing stable APIs to build on top of."

[[developer_support]]
	name = "Shared data structures"
	icon = "bi-hdd-stack"
	text = "Providing standardized and well-supported data structures to pass around data."

[[developer_support]]
	name = "Recognition"
	icon = "bi-award"
	text = "Making sure all contributions are recognized in our change logs and documentation."

[[developer_support]]
	name = "Promotion"
	icon = "bi-megaphone"
	text = "Promoting [ecosystem packages](/packages/#ecosystem) that rely on scverse via our website and social media feeds."

[[developer_support]]
	name = "Open channels"
	icon = "bi-chat-square-text"
	text = "Establishing open communication channels for discussion and collaboration between developers, and a common forum for user support and engagement."
+++


## Goals

We as scverse® want to make analysis tools for omics data in the life sciences as accessible as possible. This means:

{{< principles "goals" >}}

## Organization and vision

The growing adoption of Python for single-cell omics data analysis has been catalyzed by [Scanpy](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-017-1382-0) and [AnnData](https://anndata.scverse.org/). 
Around this infrastructure an ecosystem of packages has been created by various developers and institutions — extending single-cell analysis to different modalities and addressing challenges at the cutting-edge of single-cell research. We believe that progress in this field can't be siloed to a few groups. To further nurture the growth of this ecosystem, we've formed a new organization — scverse.

{{< stats >}}

Scverse is a consortium of tools with users and developers across the world. To sustain the utility and growth of the ecosystem, it’s essential that the core analytic tools are robust and well-maintained. This entails consistent support and improvement of tools beyond what's possible in the conventional single-lab academic setting.

Scverse provides high quality infrastructure for analysis of single cell omics data. These [core tools](/packages/) are well documented, tested, and provide broad functionality. They work with standardized data structures which use common Python numeric types and have interchange-friendly on-disk formats.

{{< aside "What counts as a core tool?" >}}
Those which facilitate sharing data through common formats, or provide foundational support for single cell datatypes (e.g. modality-specific IO, toolkits) and analyses.
They are placed under [shared maintenance](/about/roles/) and development in the [scverse GitHub organization](https://github.com/scverse).
{{< /aside >}}

Scverse strives for synergy and interoperability with the ecosystem of packages built around these core tools, to ultimately give users a cutting-edge and varied selection of analysis methods.

## User engagement

We are community-driven and committed to keeping the scverse community open. We strive to actively foster a community where everyone is and feels welcomed, and where there are no barriers to contributions in any form. We welcome newcomers and pledge to build an environment where they can grow as contributors, developers, and community members. Together with technical and development support, we also support our users through:

{{< principles "user_support" >}}

## Developer engagement

Tools within scverse are deliberately not unified under a single package, and instead form a consortium of core analytic tools with shared maintenance responsibilities. 
Development of these packages is not restricted — contributions are welcomed and publicly acknowledged.
However, scverse aims to support the external development of new approaches to analyze and work with single cell data.
We encourage the creation of new methods and tools on top of the core packages and data-structures.

We support the development of these ecosystem packages by:

{{< principles "developer_support" >}}
