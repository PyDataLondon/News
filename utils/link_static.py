"""
Link shared static assets into each monthly folder.

Usage:
    python utils/link_static.py

This replaces duplicate CSS files and the shared PyData logo in monthly
directories with symlinks into the top-level static/ directory.
"""

from __future__ import annotations

import hashlib
import os
from pathlib import Path
from typing import Dict, Iterable, Optional

ROOT = Path(__file__).resolve().parent.parent
STATIC_CSS = {
    "slides-base.css": ROOT / "static/css/slides-base.css",
    "slides-headings.css": ROOT / "static/css/slides-headings.css",
    "slides-large-headings.css": ROOT / "static/css/slides-large-headings.css",
}
STATIC_IMAGES_DIR = ROOT / "static/images"


def file_hash(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def css_hash(path: Path) -> str:
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n").replace("\r", "\n")
    return hashlib.md5(text.encode("utf-8")).hexdigest()


def monthly_dirs() -> Iterable[Path]:
    for path in ROOT.iterdir():
        if not path.is_dir():
            continue
        if not path.name.startswith("20") or "PyData-News" not in path.name:
            continue
        if any(path.glob("*.ipynb")):
            yield path


def build_css_hash_map() -> Dict[str, Path]:
    missing = [name for name, path in STATIC_CSS.items() if not path.exists()]
    if missing:
        raise SystemExit(f"Missing static CSS: {', '.join(missing)}")
    return {css_hash(path): path for path in STATIC_CSS.values()}


def build_image_hash_map() -> Dict[str, Path]:
    if not STATIC_IMAGES_DIR.exists():
        raise SystemExit("Missing static images directory")
    hash_map: Dict[str, Path] = {}
    for path in STATIC_IMAGES_DIR.iterdir():
        if not path.is_file():
            continue
        hash_map[file_hash(path)] = path
    if not hash_map:
        raise SystemExit("No static images found to link")
    return hash_map


def symlink_to_static(source: Path, target: Path) -> str:
    # If already correctly linked, leave it alone.
    if source.is_symlink() and source.resolve() == target.resolve():
        return "already-linked"

    rel_target = os.path.relpath(target, start=source.parent)
    if source.exists() or source.is_symlink():
        source.unlink()
    source.symlink_to(rel_target)
    return "linked"


def process_css(css_path: Path, css_hash_map: Dict[str, Path]) -> Optional[str]:
    if not css_path.exists():
        return None
    current_hash = css_hash(css_path)
    target = css_hash_map.get(current_hash)
    if not target:
        return "skipped-unmatched"
    return symlink_to_static(css_path, target)


def process_image(image_path: Path, image_hash_map: Dict[str, Path]) -> Optional[str]:
    if not image_path.exists():
        return None
    current_hash = file_hash(image_path)
    target = image_hash_map.get(current_hash)
    if not target:
        return "skipped-unmatched"
    return symlink_to_static(image_path, target)


def main() -> None:
    css_hash_map = build_css_hash_map()
    image_hash_map = build_image_hash_map()

    css_linked = css_already = css_skipped = 0
    img_linked = img_already = img_skipped = 0

    for folder in monthly_dirs():
        css_files = [folder / "custom.css", folder / "styles" / "custom.css"]
        for css in css_files:
            result = process_css(css, css_hash_map)
            if result == "linked":
                css_linked += 1
            elif result == "already-linked":
                css_already += 1
            elif result == "skipped-unmatched":
                css_skipped += 1

        images_dir = folder / "images"
        if images_dir.is_dir():
            for image in images_dir.glob("*.png"):
                result = process_image(image, image_hash_map)
                if result == "linked":
                    img_linked += 1
                elif result == "already-linked":
                    img_already += 1
                elif result == "skipped-unmatched":
                    img_skipped += 1

    print(
        f"CSS linked {css_linked}, already linked {css_already}, skipped {css_skipped}"
    )
    print(
        f"Images linked {img_linked}, already linked {img_already}, skipped {img_skipped}"
    )


if __name__ == "__main__":
    main()
