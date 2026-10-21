# Website - three versions of one personal site

| Folder | Version | What it is |
|---|---|---|
| `V0/` | V0 | The frozen baseline produced in Task 1, plus three recorded essential repairs. **Never edited after freezing.** |
| `V1/` | V1 | V0 with **in-context learning** applied (three worked exemplars in prompt P4). Starts from V0, not from V2. |
| `V2/` | V2 | V0 with **retrieval-augmented generation** applied (12 BM25-retrieved passages in prompt P5). Starts from V0, not from V1. |

Each folder is a self-contained static site: `index.html`, `styles.css`,
`main.js` and `assets/`. There is no build step, no package manager, no CDN and
no backend, so the three versions can be opened straight from disk.

## How to open a version

Double-click `index.html` in any of the three folders, or drag it into a
browser. Everything works from a `file://` URL: the theme switch, the
navigation highlight, the project panels and the form validation.

A local server is only needed if your browser is stricter than Chrome, Edge or
Firefox about local files. From this folder:

    python serve.py            # then open http://127.0.0.1:8000/
    python serve.py 8080       # different port

The server prints one link per version, e.g.
`http://127.0.0.1:8000/V0/`.

## Publishing (three separate web pages)

Any static host works. The folder layout is already the one GitHub Pages
expects, so publishing this folder publishes all three versions at once:

    https://<user>.github.io/<repo>/V0/
    https://<user>.github.io/<repo>/V1/
    https://<user>.github.io/<repo>/V2/

Steps: create a repository, copy the contents of this `website/` folder into
it, push, then in *Settings -> Pages* choose **Deploy from a branch**, branch
`main`, folder `/ (root)`. The `.nojekyll` file is already here so no file is
filtered out. No build action is required.

If your host needs one site per deployment (Netlify, Vercel, Cloudflare Pages),
point three separate sites at `V0/`, `V1/` and `V2/` respectively.

## Notes on the three versions

* **V0 is unchanged** after freezing. Its source is byte-identical to the copy
  that was evaluated; the evaluation results in `../evaluation/results/` were
  produced from it.
* **V1 and V2 both start from V0.** They are not successive: V2 does not
  contain V1's changes. That is deliberate, so that each technique can be
  measured on its own.
* All three use the same visible copy; the differences are in markup,
  interaction and styling only.
* The display name "Marcus Chan" is a pseudonym and the contact address uses
  the reserved `example.com` domain, as the brief requires.
