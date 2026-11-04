# Leonardo Grigorio Ferreira · Portfolio

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/leogrigs/portfolio)
![Coverage Badge](./badge.svg)

A short scroll story about where my career is now, not a project showcase. A particle field behind the page changes shape with each chapter.

| Chapter | What happens |
| --- | --- |
| Start | Particles assemble the name and push away from the cursor |
| Impact | Pinned before/after counters while the particles become a ticking clock |
| Path | Horizontal timeline that draws itself over a flowing wave, ending on the current role, plus a toolkit marquee |
| Contact | Magnetic email link, live São Paulo clock |

Everything respects `prefers-reduced-motion` (static particles, no pinning or scrubbing) and works in Portuguese and English, light and dark. The palette is black and white; `--accent` in [`src/index.css`](src/index.css) is the single token to change for a colour.

## Stack

React, TypeScript, Vite, Tailwind CSS, Framer Motion, a hand-written canvas particle system, Vitest.

## Editing content

All copy lives in [`src/content/pt.ts`](src/content/pt.ts) and [`src/content/en.ts`](src/content/en.ts) (same shape, enforced by tests). Wrap words in `*asterisks*` to render them in the italic serif accent. Links are in [`src/content/links.ts`](src/content/links.ts).

```bash
npm install
npm run dev
npm test
```

## Author

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&logoColor=white&style=flat)](https://www.linkedin.com/in/leonardo-grigorio-ferreira/)
[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white&style=flat)](mailto:leo.grigorio16@gmail.com)
