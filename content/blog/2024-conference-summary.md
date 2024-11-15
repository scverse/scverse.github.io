# Highlights from the inaugural scverse conference 2024

<img src="/img/blog/conference2024.png" style="max-width: 100%;" alt="conference-group-picture" />

The first scverse conference held in Munich, Germany from 10-12 September, 2024 brought together leading scientists, developers, and researchers from the single-cell genomics and spatial biology community. The conference was organized around five main events: (A) 6 keynotes from leaders in the field (B) 13 short talks from developers, graduate students, postdocs (C) 14 workshops with hands-on experience on various aspects of data analysis and software development (D) Poster session showcasing more than 50 posters (E) Talks from our sponsors showcasing their latest advancements. This year, the focus was on latest community-driven developments in multi-modal and spatial data analysis, broadening scverse accessibility and outreach, and enhancing interoperability. With over 170 participants from 17 different countries, the inaugural scverse conference was a success. Here, we provide major highlights from the conference. 

### Keynotes

The conference had 6 keynotes from leaders of the field and founders of Scanpy/scverse. The keynotes were designed to highlight different aspects of the current data analysis and software development research ecosystem in single-cell genomics. 

1. Dr. Rob Patro (University of Maryland) presented his lab’s method called [alevin-fry](https://github.com/COMBINE-lab/alevin-fry) and a framework called simpleaf to use alevin-fry. It is a suite of tools for processing read level data in order to create count matrices. While most labs begin working with the count matrices and downstream analysis, Dr. Patro’s talk highlighted the importance of parameter choices and proper processing of the sequencing reads for effective downstream computation.   
2. Dr. Angela Olivera Pisco (Insitro) presented her lab’s work on collecting and analyzing whole organism atlases ([Tabula Muris](https://www.czbiohub.org/sf/tabula-muris/) and [Tabula Sapiens](https://tabula-sapiens.sf.czbiohub.org/)). Through a centralized platform, Dr. Pisco’s team was able to integrate data from multiple donors and generate a unified atlas for various organs. Her lab is utilizing AI and multimodal information including histology, medical records to eventually design large-scale pooled compound screens for effective drug design.   
3. Dr. Christina Leslie (Memorial Sloan Kettering Cancer Center) presented her lab’s three recent methods to analyze epigenomic data: [CellSpace](https://github.com/zakieh-tayyebi/CellSpace), [SCARlink](https://github.com/snehamitra/SCARlink) and [ChromaFold](https://github.com/viannegao/ChromaFold). Dr. Leslie showcased how these methods enable batch-effect free sequence based embedding, prediction of regulatory regions around a gene and estimation of 3D chromatin structure from a linear single-cell ATAC-sequencing data.   
4. Dr. Alex Wolf (Lamin), who is also the first developer of Scanpy gave a historical overview of how Scanpy came into being. Dr. Wolf then transitioned into presenting some of his recent work at [Lamin](https://docs.lamin.ai/introduction), where his team is developing structured data management tools to unify access to data and metadata, maintain data lineages, manage registries for metadata and organize data across distributed platforms.   
5. Dr. Maria Brbic (Swiss Federal Institute of Technology Lausanne) presented her lab’s work on integrating atlas-level data sets through methods such as [MARS](https://brbiclab.epfl.ch/projects/mars/) and SATURN (unpublished work). MARS enables annotation of cells as known or novel using a labeled reference. She also discussed [STELLAR](https://brbiclab.epfl.ch/projects/stellar/), a geometric deep-learning method to detect spatial and molecular signatures that identify specific cell types in spatial transcriptomics data.   
6. Dr. Fabian Theis (Helmholtz Munich), a key supporter of Scanpy and scverse from their inception, provided a historical perspective on their evolution and the growth of computational methods in single-cell genomics. He concluded with a brief vignette of his lab’s recent endeavor called [NicheFormer](https://github.com/theislab/nicheformer), a foundation model for single-cell omics and spatial transcriptomics. 

Every keynote was followed with an engaging Q\&A session, which highlighted the success of the keynotes. 

### Short talks

The conference also featured several 15-minute short talks, each followed by a Q\&A session. These talks were carefully selected from 72 abstract submissions based on their relevance, impact, and contribution to the field. The topics spanned a wide range of computational techniques in single-cell genomics, including methods for scaling analyses to millions of cells, integrating single-cell data with dynamic models to develop *velocyto*\-like metrics, user-friendly exploration of epigenomic data, and innovative approaches for representing and analyzing spatial data.

The presenters were primarily graduate students and postdoctoral researchers from various academic labs. We believe that providing opportunities for junior scientists to showcase their work and receive constructive feedback is crucial to fostering their growth. This format also allowed the audience to delve into the finer details of each method, complementing the broader discussions. Each short talk sparked extensive conversations, a testament to the effectiveness of this approach. Many attendees expressed their appreciation (some vignettes below) for the inclusion of these talks, particularly for highlighting the contributions of early-career researchers and promoting their visibility within the community.

### Workshops

A unique highlight of the scverse conference, setting it apart from other single-cell genomics events, was the workshops. Each workshop lasted one hour, including a Q\&A session, and spanned the second and third days of the conference. Designed to dive deeper into the methods and contexts discussed, the workshops provided presenters the opportunity to explore their topics in greater detail. With three parallel workshops running simultaneously, attendees enjoyed a more intimate setting for in-depth discussion.

The workshops covered a wide range of topics, from live-coding demonstrations and hands-on exercises to focused talks on various aspects of single-cell computation. These included introductions to single-cell RNA-seq analysis, accelerating computation with GPUs, techniques for subcellular spatial analysis, and approaches for systematically addressing open challenges in the field. Many of the workshops took on a tutorial format, fostering a more interactive and engaging atmosphere, breaking away from the formal structure of standard presentations.

The workshops were widely regarded as one of the conference’s major highlights, as reflected in the enthusiastic feedback from participants (see examples below).

### Poster session

The conference also featured a poster session, where participants showcased their research and engaged in discussions with attendees. A total of 51 posters were presented during the two-hour session, providing ample opportunity for in-depth conversations and knowledge exchange.

### Sponsor talks

The conference would not have been possible without the generous support of our sponsors. We were honored to receive sponsorships from [CZI](https://chanzuckerberg.com/) (Diamond), [Immunai](https://www.immunai.com/) (Platinum), [Altos](https://www.altoslabs.com/) (Gold), [10x Genomics](https://www.10xgenomics.com/) (Gold), [tilDB](https://tiledb.com/) (Gold), [Lamin](https://lamin.ai/) (Silver), [Latch Bio](https://latch.bio/) (Silver), [Data Intuitive](https://www.data-intuitive.com/) (Silver) and [Boehringer-Ingelheim](https://www.boehringer-ingelheim.com/de) (Silver). As part of the sponsor engagement, 10x Genomics delivered a brief presentation on their latest initiatives, CZI hosted a workshop and gave a short talk, and Immunai presented their latest research. The conference also provided an excellent opportunity for participants to network with industry leaders, fostering collaboration and knowledge exchange.

<img src="/img/blog/conference2024-sponsors.png" style="max-width: 100%;" alt="conference-sponsors" />

### Vignettes from participants

*Hearing the speakers discuss their thought processes and motivations behind developing bioinformatics tools gave me a deeper understanding of the development process and reinforced my desire to create my own tools in the future. This conference has inspired me to explore new frontiers in single-cell and spatial transcriptomics research, and I look*  
*forward to future opportunities to share my work and learn from others in the field.*  
Yejin Kwak \- Pusan National University (KOR)

*One of the highlights of the conference was the carefully curated series of workshops. These sessions provided not just immediate skill acquisition, but also valuable resources for continued learning post-conference. My only regret is that I couldn't attend all of them at the same time. For future events, I echo the suggestion made in Zulip that recording these workshops would be great for attendees who couldn't participate in person.*  
Jiri Bruthans \- Charles University Prague (CZE)

*My software is still very much in the early stages of development, and I went through a period of doubts before applying to present at a poster session during the conference. In the end, I’m pleased I pushed past my hesitation and showcased my project. \[...\] The conference provided an excellent platform to present my research and gather invaluable feedback from peers. Since this was my first time presenting at a bioinformatics conference, I had plenty of beginner-level questions on “how to…” present research where the method itself is the main deliverable. Engaging with the bioinformatics community was a fantastic opportunity, and I’m now motivated to integrate the constructive feedback I received to improve its functionality. It was also nice to find colleagues working in the same field who proposed their datasets to test the functionality of my software.*   
Anna Diamant \- IPMC, Université Nice Côte d'Azur (FRA)

### Conclusion 

The inaugural scverse conference surpassed our expectations, both in terms of participant numbers and the overwhelmingly positive feedback we received. Energized by this success, we look forward to many more years of impactful events, including conferences and hackathons, driving innovation with scverse tools in the single-cell genomics field.