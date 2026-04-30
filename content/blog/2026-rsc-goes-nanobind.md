+++
title = "rapids-singlecell 0.15.0: Prebuilt CUDA Wheels and Compiled Kernels"
date = 2026-04-30T00:00:05+01:00
description = "rapids-singlecell 0.15.0 ships GPU kernels as precompiled wheels — no more runtime compilation."
author = "Severin Dicks"
draft = false
+++

# rapids-singlecell 0.15.0: Prebuilt CUDA Wheels and Compiled Kernels

*rapids-singlecell 0.15.0 now ships GPU kernels as precompiled extensions instead of being compiled at runtime.
Here's what that means for you.*

---

## Why the packaging changed

In earlier versions of rapids-singlecell, all GPU kernels were written as CuPy RawKernels.
These were compiled the first time you called them — in your environment, on your machine.
That worked, but it came with friction:

- **First-call latency.**
  The initial invocation of a kernel-backed function could take several seconds while nvrtc compiled the CUDA source.
- **Silent dtype/layout mismatches.**
  A RawKernel receives raw pointers.
  If the input array had the wrong dtype or wasn't C-contiguous, the kernel might silently produce garbage rather than raising an error.
- **CUDA code trapped in Python strings.**
  RawKernels are defined as CUDA source inside Python string literals.
  That means no syntax highlighting, no autocomplete, and no compiler warnings in your editor — debugging C++ code buried in a Python string is nobody's idea of a good time.

Starting with 0.15.0, these kernels are compiled once at build time and shipped as nanobind/CUDA C++ extension modules inside the wheel.
The result is a more conventional compiled-extension workflow: you `pip install` the package and every kernel is ready immediately.

## What changed

The GPU kernels that were previously CuPy RawKernels are now nanobind C++ extensions built with `scikit-build-core` and CMake.
This gives us:

- **No runtime compilation** for any migrated kernel — the compiled code is in the wheel.
- **Typed bindings at the Python/C++ boundary.**
  nanobind enforces dtype (e.g. float32 vs float64) and memory layout (C-contiguous vs F-contiguous) before the kernel launches, so mismatches raise a clear `TypeError` instead of producing wrong results.
- **A conventional C++/CUDA project structure** with headers, shared helpers, and room for larger fused or fully C++ GPU routines.
  Harmony2, shipping in this release, is the first example of a more complex function built on this foundation.
- **CUDA-versioned wheel packaging.**
  CI builds separate wheels for each CUDA major version — `rapids-singlecell-cu12` and `rapids-singlecell-cu13` — each with a `[rapids]` dependency extra that pulls in the matching RAPIDS and CuPy packages.

The Python API and import name are unchanged:

```python
import rapids_singlecell as rsc
```

Your existing analysis scripts should work without modification.

## CUDA-specific wheels

Because the kernels are now compiled binaries, we need to ship one wheel per CUDA major version.
(Python wheel tags don't encode CUDA version, so we encode it in the package name — the same approach used by CuPy, PyTorch, and other CUDA-dependent packages.)

| Package name | Compiled with | Runtime CUDA support | Blackwell GPUs |
|---|---|---|---|
| `rapids-singlecell-cu12` | CUDA 12.2 | CUDA 12.2 – 12.9+ | Via PTX JIT (sm_90) |
| `rapids-singlecell-cu13` | CUDA 13.0 | CUDA 13.0+ | Native binaries |

Both wheels are available for **x86_64** and **aarch64** on Linux.

If you have a Blackwell GPU (B200, GB200) and want the best out-of-the-box performance, the CUDA 13 wheel includes native binaries for Blackwell architectures.
The CUDA 12 wheel still supports Blackwell through PTX just-in-time compilation, so it will work, but the first kernel launch on Blackwell will be slightly slower while the driver JIT-compiles the PTX.

## How to install

### Prebuilt wheel (recommended)

Pick the wheel that matches your CUDA version:

```bash
pip install rapids-singlecell-cu13   # CUDA 13
pip install rapids-singlecell-cu12   # CUDA 12
```

This installs rapids-singlecell with precompiled kernels, but does **not** pull in the RAPIDS stack (cupy, cuml, cudf, etc.).
If you manage those dependencies separately — for example, through conda — this is all you need.

### Prebuilt wheel with RAPIDS dependencies

If you want pip to also install the matching RAPIDS and CuPy packages:

```bash
pip install 'rapids-singlecell-cu13[rapids]' --extra-index-url=https://pypi.nvidia.com
pip install 'rapids-singlecell-cu12[rapids]' --extra-index-url=https://pypi.nvidia.com
```

Note: on the prebuilt wheels, the dependency extra is always `[rapids]`.
The CUDA version is determined by which package name you install — `rapids-singlecell-cu12` or `rapids-singlecell-cu13`.
If you're building from source instead, the extras are `[rapids-cu12]` and `[rapids-cu13]`.

### Conda / Mamba

Environment files are provided in the repository:

```bash
conda env create -f conda/rsc_rapids_26.04_cuda13.yml   # Python 3.14, CUDA 13
conda env create -f conda/rsc_rapids_26.04_cuda12.yml   # Python 3.14, CUDA 12
```

> **Note:** RAPIDS currently does not support `channel_priority: strict`. Use `channel_priority: flexible` instead.

### Docker / Apptainer

Pre-built containers are available for both CUDA versions:

```bash
docker pull ghcr.io/scverse/rapids-singlecell-cu13:latest
docker run --rm --gpus all ghcr.io/scverse/rapids-singlecell-cu13:latest
```

For HPC clusters using Apptainer/Singularity:

```bash
apptainer pull rsc.sif docker://ghcr.io/scverse/rapids-singlecell-cu13:latest
apptainer run --nv rsc.sif
```

## Migration from 0.14.x

For most users, upgrading is straightforward:

1. **Change your pip install command.**
   Replace `pip install rapids-singlecell` with `pip install rapids-singlecell-cu12` or `rapids-singlecell-cu13`, depending on your CUDA version.
2. **No code changes needed.**
   The `import rapids_singlecell as rsc` import and all public APIs remain the same.
3. **Check your CUDA version.**
   Run `nvidia-smi` or `nvcc --version` to confirm whether you're on CUDA 12.x or CUDA 13.x, and install the matching wheel.
   If you're using conda, make sure the CUDA runtime library version in your environment matches the wheel you install — e.g., `cuda-cudart` from the `nvidia` channel should be 12.x for the cu12 wheel or 13.x for the cu13 wheel.

## What about `pip install rapids-singlecell`?

The plain install — `pip install rapids-singlecell`, without the `-cu12` or `-cu13` suffix — still works.
It will compile the CUDA extensions from source during installation.
This is perfectly functional, but please be aware of what that means: you need a CUDA toolkit with nvcc, CMake ≥ 3.24, and a compatible C++ compiler already present in your environment, and the build will take longer than downloading a prebuilt wheel.

When building from source, you can install the matching RAPIDS dependencies with the `[rapids-cu12]` or `[rapids-cu13]` extra:

```bash
pip install 'rapids-singlecell[rapids-cu12]' --extra-index-url=https://pypi.nvidia.com
```

Or install the RAPIDS stack separately before or after the build.

For most users, we recommend the prebuilt CUDA wheels.
They're faster to install and don't require a local compiler toolchain.
For more details on source builds — including how to target custom GPU architectures — see the [installation docs](https://rapids-singlecell.readthedocs.io/en/latest/installation.html).

Source builds are the right choice if you are:

- **Contributing to rapids-singlecell** and need to iterate on C++ kernel code.
- **Debugging CUDA extensions** and want to compile with debug flags or sanitizers.
- **Targeting a custom GPU architecture** not covered by the prebuilt wheels (e.g. a future compute capability).
- **On a platform we don't publish wheels for** (though we cover x86_64 and aarch64 Linux).

If none of those apply to you, use the prebuilt wheel.

## Other highlights in 0.15.0

Beyond packaging, this release includes a substantial set of algorithmic and performance improvements built up across the 0.15.0 development cycle:

### Harmony2 and C++ harmony

Harmony was rewritten as a C++ nanobind kernel ([#578](https://github.com/scverse/rapids-singlecell/pull/578)), making it significantly faster and more memory-efficient.
On top of that, we implemented three algorithmic improvements from the Harmony2 paper (Patikas et al. 2026): a stabilized diversity penalty, dynamic per-cluster-per-batch ridge regularization, and automatic batch pruning to prevent overintegration in biologically heterogeneous datasets ([#625](https://github.com/scverse/rapids-singlecell/pull/625)).
This is also the first example of a more complex routine built on the new compiled-kernel infrastructure.

### Contrast-based energy distance

Perturbation experiments typically don't need a full k×k distance matrix between all groups — you want to compare each perturbation against one or two controls, possibly stratified by cell type.
The new `contrast_distances()` API ([#603](https://github.com/scverse/rapids-singlecell/pull/603)) lets you express exactly that.
You build a contrasts DataFrame — either with the `Distance.create_contrasts()` helper or by hand — where each row is a (target, reference) comparison, optionally stratified by `split_by` columns (e.g., cell type).
Under the hood, the kernel deduplicates shared distance pairs across contrasts, subsets the embedding to only the referenced cells before transferring to GPU, and launches a single kernel call for all unique pairs.
The result is a copy of your contrasts DataFrame with an `edistance` column appended.

```python
from rapids_singlecell.pertpy_gpu import Distance

dist = Distance("edistance")

# Compare each perturbation against two controls, stratified by cell type
contrasts = Distance.create_contrasts(
    adata,
    groupby="target_gene",
    selected_group=["Non_target", "Scramble"],
    split_by="cell_type",
)

result = dist.contrast_distances(adata, contrasts=contrasts)
```

`onesided_distances()` also now accepts a sequence of control group names via `selected_group`, returning a DataFrame with one column per control ([#601](https://github.com/scverse/rapids-singlecell/pull/601)).
Both energy distance and co-occurrence kernels gained multi-GPU support ([#545](https://github.com/scverse/rapids-singlecell/pull/545), [#546](https://github.com/scverse/rapids-singlecell/pull/546)).

### More highlights

- **Dask support for `highly_variable_genes`** with the Seurat v3 flavor ([#616](https://github.com/scverse/rapids-singlecell/pull/616)).
- **CUDA kernel error surfacing** — launch errors are now raised instead of silently continuing ([#619](https://github.com/scverse/rapids-singlecell/pull/619)).
- **RAPIDS 26.04 and Python 3.14 support** across all CI and conda environments.

## Get started

```bash
pip install rapids-singlecell-cu13   # or rapids-singlecell-cu12
```

For questions and bug reports, visit the [GitHub issue tracker](https://github.com/scverse/rapids_singlecell/issues).

---

*rapids-singlecell is part of the [scverse](https://scverse.org) ecosystem.
If you use it in your research, please cite the project.*
