#!/bin/python3

import shutil
import pathlib
import jinja2
import argparse


def parse_args():
    p = argparse.ArgumentParser(
        description="Create a static website using Jinja2 templates")
    p.add_argument('srcdir', type=pathlib.Path, help="Source directory")
    p.add_argument('destdir', type=pathlib.Path, help="Destination directory")
    args = p.parse_args()
    return args.srcdir, args.destdir


def install(filename, srcdirpath, destdirpath):
    src = srcdirpath / filename
    dest = destdirpath / filename
    if not dest.exists() or dest.stat().st_mtime < src.stat().st_mtime:
        print(f"install {src} to {dest}")
        shutil.copy(src, dest)


def render(env, reldirpath, destdirpath, filename):
    dest = destdirpath / filename
    template = env.get_template(str(reldirpath / filename))
    if dest.exists():
        # Only update dest if contents differ
        with open(dest) as fh:
            old_contents = fh.read()
        new_contents = template.render()
        if new_contents != old_contents:
            print(f"render {dest}")
            with open(dest, 'w') as fh:
                fh.write(new_contents)
    else:
        print(f"render {dest}")
        with open(dest, 'w') as fh:
            fh.write(template.render())


def install_dir(srcdir, destdir):
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(srcdir),
        autoescape=jinja2.select_autoescape())

    for dirpath, dirnames, filenames in srcdir.walk():
        reldirpath = dirpath.relative_to(srcdir)
        destdirpath = destdir / reldirpath
        if not destdirpath.exists():
            print(f"mkdir {destdirpath}")
            destdirpath.mkdir()
        for f in filenames:
            if f.endswith('.html'):
                if f.startswith('_'):
                    continue
                else:
                    render(env, reldirpath, destdirpath, f)
            else:
                install(f, dirpath, destdirpath)


if __name__ == '__main__':
    srcdir, destdir = parse_args()
    install_dir(srcdir, destdir)
