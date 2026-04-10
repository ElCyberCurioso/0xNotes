#!/usr/bin/env python3
"""
generate_sidebar.py
Generates _sidebar.md from the folder/file structure.

Rules:
  - Root .order is the complete, authoritative list of sidebar entries.
    Items not listed there are invisible in the sidebar.
  - Sub-folder .order defines order; items absent from it are appended alphabetically.
  - Folder display name  = literal folder name (no transformation).
  - File display name    = first H1 heading in the file, or filename without extension.
  - Ignored everywhere   : names starting with '.' or '_', and items in SKIP_DIRS / SKIP_FILES.

Usage:
  python scripts/generate_sidebar.py          # from repo root
  python scripts/generate_sidebar.py --check  # dry-run, prints to stdout only
"""

import os
import re
import sys

# ── Config ────────────────────────────────────────────────────────────────────

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Directories never included even if listed in .order
SKIP_DIRS = {'scripts', 'node_modules', '__pycache__'}

# Files never included even if listed in .order
SKIP_FILES = {'_sidebar.md', '_navbar.md'}


# ── Helpers ───────────────────────────────────────────────────────────────────

def get_h1(filepath: str) -> str | None:
    """Return the text of the first H1 heading, or None."""
    try:
        with open(filepath, 'r', encoding='utf-8') as fh:
            for line in fh:
                m = re.match(r'^#\s+(.+)', line)
                if m:
                    return m.group(1).strip()
    except OSError:
        pass
    return None


def read_order(dirpath: str) -> list[str]:
    """Return entries from .order, or [] if the file is absent."""
    order_path = os.path.join(dirpath, '.order')
    if not os.path.exists(order_path):
        return []
    with open(order_path, 'r', encoding='utf-8') as fh:
        return [
            line.strip()
            for line in fh
            if line.strip() and not line.startswith('#')
        ]


def list_visible(dirpath: str) -> tuple[list[str], list[str]]:
    """
    Return (md_files, subdirs) that are visible (not hidden / not excluded).
    Does NOT apply .order sorting.
    """
    md_files, subdirs = [], []
    try:
        entries = os.listdir(dirpath)
    except OSError:
        return md_files, subdirs

    for name in entries:
        if name.startswith('.') or name.startswith('_'):
            continue
        full = os.path.join(dirpath, name)
        if os.path.isdir(full):
            if name not in SKIP_DIRS:
                subdirs.append(name)
        elif name.endswith('.md') and name not in SKIP_FILES:
            md_files.append(name)

    return md_files, subdirs


def ordered_items(dirpath: str, root_level: bool = False) -> list[str]:
    """
    Items ordered by .order, then remaining alphabetically.
    At root level, ONLY items listed in .order are returned.
    """
    order = read_order(dirpath)
    md_files, subdirs = list_visible(dirpath)
    available = set(md_files + subdirs)

    result = [name for name in order if name in available]

    if not root_level:
        remaining = sorted(available - set(result))
        result.extend(remaining)
    else:
        missing = [name for name in order if name not in available]
        for name in missing:
            print(f'  [WARN] .order references "{name}" in {dirpath} but it does not exist.',
                  file=sys.stderr)

    return result


def file_title(full_path: str) -> str:
    """Display name for a .md file."""
    h1 = get_h1(full_path)
    if h1:
        return h1
    return os.path.splitext(os.path.basename(full_path))[0]


# ── Generator ─────────────────────────────────────────────────────────────────

def gen_dir(dirpath: str, rel_parts: list[str], indent: int) -> list[str]:
    """Recursively generate sidebar lines for a directory (not root)."""
    lines = []
    pad = '  ' * indent

    for name in ordered_items(dirpath):
        full = os.path.join(dirpath, name)
        parts = rel_parts + [name]

        if os.path.isdir(full):
            lines.append(f'{pad}* {name}')
            lines.extend(gen_dir(full, parts, indent + 1))
        else:
            title = file_title(full)
            link = '/'.join(parts)
            lines.append(f'{pad}* [{title}]({link})')

    return lines


def gen_root() -> list[str]:
    """Generate sidebar lines for the root level."""
    lines = []

    for name in ordered_items(ROOT, root_level=True):
        full = os.path.join(ROOT, name)

        if os.path.isdir(full):
            lines.append(f'* {name}')
            lines.extend(gen_dir(full, [name], 1))
            lines.append('')          # blank line between sections
        else:
            if name == 'README.md':
                title = file_title(full) or 'Inicio'
                lines.append(f'* [{title}](/)')
            else:
                title = file_title(full)
                lines.append(f'* [{title}]({name})')

    return lines


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    dry_run = '--check' in sys.argv

    header = [
        '<!-- _sidebar.md -->',
        '<!-- Auto-generated by scripts/generate_sidebar.py — do not edit manually. -->',
        '<!-- To regenerate locally: python scripts/generate_sidebar.py -->',
        '',
    ]
    body = gen_root()
    content = '\n'.join(header + body) + '\n'

    if dry_run:
        print(content)
        return

    sidebar_path = os.path.join(ROOT, '_sidebar.md')
    with open(sidebar_path, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(content)

    print(f'OK _sidebar.md generated ({len(body)} lines)')


if __name__ == '__main__':
    main()
