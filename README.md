# richardjdli.com

Personal portfolio for Richard JD Li — a single, continuous experience built around a
live knowledge-graph canvas ("Athenæum"), with client-side transitions between the
landing page, project detail pages, and an about page (no reloads).

## Stack

- **Next.js** (App Router, `output: 'export'` → static site)
- **React** + **TypeScript**
- Plain CSS + inline styles (no UI framework); fonts via Google Fonts
  (Libre Caslon Text, JetBrains Mono, Spectral, IBM Plex Mono)
- Deploys to **Cloudflare Pages** → richardjdli.com

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

## Structure

```
src/
  app/
    layout.tsx              # html shell, metadata, font links
    page.tsx                # renders <Portfolio/>
    globals.css             # design CSS + scoped UW-diagram animations
  components/
    Portfolio.tsx           # the whole experience: graph canvas, custom cursor,
                            # scroll choreography, and the home / detail / about screens
    UwPipelineDiagram.tsx   # animated scRNA-seq pipeline figure (UW project)
  lib/
    projects.ts             # content source of truth (projects, experience, tools…)
    css.ts                  # parse inline CSS strings into React style objects
public/
  assets/                   # images, logos, textures
```

## Editing content

All copy lives in [`src/lib/projects.ts`](src/lib/projects.ts) — projects, the about-page
experience timeline, the toolkit list, and the rotating status phrases. Images live in
`public/assets/`.

## Deep links

The experience is one page, but individual views are linkable:

- `/?p=<projectId>` opens a project detail (e.g. `/?p=uw`)
- `/?about` opens the about page
