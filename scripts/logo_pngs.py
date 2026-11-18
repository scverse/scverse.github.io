#!/usr/bin/env python3
"""Render the media kit’s logo SVGs to PNGs for light and dark backgrounds.

The SVGs pick their outline colors with light-dark(), which resvg doesn’t support,
so each mode’s value is substituted before rendering.
Writes <name>-light.png (dark on light) and <name>-dark.png (light on dark) next to each SVG,
only when the bytes change, so prek fails exactly when a PNG is out of date. Needs `resvg` on the PATH.
"""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
LOGOS = {  # SVG → PNG width in pixels
    "static/img/logo/scverse-logo.svg": 1000,
    "static/img/logo/scverse-logomark.svg": 500,
    "static/img/logo/scverse-logomark-reg.svg": 500,
}
LIGHT_DARK = re.compile(r"light-dark\(\s*([^,()]+?)\s*,\s*([^,()]+?)\s*\)")


def render(svg: str, mode: str, width: int) -> bytes:
    group = 1 if mode == "light" else 2
    svg = LIGHT_DARK.sub(lambda m: m[group], svg)
    assert "light-dark(" not in svg, "unsupported light-dark() syntax"
    cmd = ["resvg", "--width", str(width), "-", "-c"]
    return subprocess.run(cmd, input=svg.encode(), check=True, capture_output=True).stdout


def main() -> None:
    for rel, width in LOGOS.items():
        src = ROOT / rel
        svg = src.read_text()
        for mode in ("light", "dark"):
            out = src.with_name(f"{src.stem}-{mode}.png")
            png = render(svg, mode, width)
            if not out.exists() or out.read_bytes() != png:
                out.write_bytes(png)
                print(f"wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as e:
        sys.exit(e.stderr.decode())
