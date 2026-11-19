# nganso.com — personal site

Gustave Nganso's personal site: a one-page positioning site (generative-AI
consultant, enterprise focus) plus a small writing section. Built with
[Astro](https://astro.build) (static output).

## Documentation

**See [`docs/site-notes.md`](docs/site-notes.md)** for the positioning decisions,
copy rationale, design tokens, how the inline-SVG diagrams/charts are built, the
change log, and open TODOs. Read it before rewriting copy or adding visuals.

## Project structure

```
├── docs/
│   └── site-notes.md          # working documentation (start here)
├── public/                     # static assets (resume.pdf, images, videos)
├── src/
│   ├── layouts/
│   │   ├── Layout.astro         # old landing page layout (coming-soon)
│   │   └── WritingLayout.astro  # blog post layout
│   └── pages/
│       ├── index.astro          # homepage (self-contained head + styles)
│       ├── coming-soon.astro    # old landing page, kept + unlinked
│       └── writing/
│           ├── index.astro                 # /writing index (auto-lists posts)
│           ├── demo-to-production.md        # post
│           └── rag-in-production.md         # post (diagram + charts)
└── package.json
```

Astro serves each `.astro`/`.md` file in `src/pages/` as a route based on its
file name. Static assets go in `public/`.

## Develop

```bash
npm run dev      # local dev server
npm run build    # static build → dist/
```

## Olotalk widget

The homepage, writing index, and posts share `src/components/OlotalkWidget.astro`,
which loads Olotalk's floating chat bubble. Set `PUBLIC_OLOTALK_ASSISTANT_ID`
in `.env` to the assistant ID from the Olotalk dashboard (see `.env.example`).
Without an ID, no widget is loaded. `PUBLIC_OLOTALK_API_ORIGIN` is optional;
leave it empty for Olotalk Cloud or set it for a self-hosted API.

These public settings are embedded at build time, so rebuild after changing
them. For production, use a live assistant with the site's domains allowed
in its Olotalk settings.
