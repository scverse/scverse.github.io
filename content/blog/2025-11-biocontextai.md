+++
title = "scverse × BioContextAI: Community Infrastructure for Agentic Analysis"
date = 2025-11-08T00:00:05+01:00
description = "scverse partners with BioContextAI to build biomedical MCPs."
author = "Malte Kuehl, Lukas Heumos"
draft = false
+++

# scverse × BioContextAI: Community Infrastructure for Agentic Analysis

We're excited to announce that we are partnering with [BioContextAI][biocontextai], a new open-source initiative for building agentic systems in biomedical research.
BioContextAI provides a community registry for Model Context Protocol (MCP) servers.
These are standardized tools that allow AI systems to access specialized databases and software.
This project was recently published as a [Nature Biotechnology correspondence][Nature Biotechnology correspondence] and we are actively starting to explore and contribute scverse MCP servers.

<img src="/img/blog/biocontextai_overview.png" style="max-width: 100%;" alt="BioContextAI overview" />

## What we're building

BioContextAI currently hosts over 40 community-built biomedical MCP servers with hundreds of tools, including the BioContextAI Knowledgebase MCP with access to resources like UniProt, Open Targets, and pathway databases.
There's a natural synergy here: while scverse packages handle computational analyses, these knowledge resources support the hypothesis generation and interpretation work that happens around those analyses.
By jointly building best practice scverse MCP servers, we hope to facilitate exploration of omics data and provide improved code generation for scverse ecosystem-enabled analyses, all while maintaining reproducibility and transparency.
This is early work and we are actively evaluating patterns for building MCP servers that integrate well with existing workflows and best practices.

## How to get involved

Check out the Registry at [biocontext.ai][biocontextai] to explore community-built MCP servers.
If you're interested in building new servers, try the [cookiecutter template][biocontextai-cookiecutter] to get started.
Join the conversation on the [BioContextAI channel][biocontextai-zulip] within the scverse Zulip to connect with other developers and researchers working in this space.
We're excited to see what the community builds together.

## Learn more

Learn more about BioContextAI in the [Nature Biotechnology correspondence][Nature Biotechnology correspondence] and on the [BioContextAI website][biocontextai].

*— The scverse core & BioContextAI teams*

[biocontextai]: https://biocontext.ai/
[biocontextai-zulip]: https://scverse.zulipchat.com/#narrow/channel/518508-biocontext-ai
[biocontextai-cookiecutter]: https://github.com/biocontext-ai/mcp-server-cookiecutter/
[Nature Biotechnology correspondence]: https://www.nature.com/articles/s41587-025-02900-9
