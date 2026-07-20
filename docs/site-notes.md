# Site notes — nganso.com

Working documentation for Gustave Nganso's personal site: what it is, the
positioning decisions behind the copy, how the visuals are built, and what's
still open. Last substantive update: **2026-07-09**.

---

## 1. What this site is

A one-page marketing site + small writing section positioning **Gustave Nganso**
as a **generative-AI consultant who embeds in a company and ships production AI**,
aimed at **enterprise** buyers. Built with **Astro** (static output).

The whole site trades on one asset: it reads like an engineer who actually
ships, not a hype merchant. Every decision below protects that.

---

## 2. Site map

| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage. Self-contained (owns its `<head>` + global `<style>`). Does **not** use `Layout.astro`. |
| `/coming-soon` | `src/pages/coming-soon.astro` | The old landing page (video bg). Uses `Layout.astro`. Kept, unlinked. |
| `/writing` | `src/pages/writing/index.astro` | Writing index. Globs `./*.md`, sorts by `date` frontmatter — new posts appear automatically. |
| `/writing/demo-to-production` | `src/pages/writing/demo-to-production.md` | Post: "The gap between an AI demo and production." |
| `/writing/rag-in-production` | `src/pages/writing/rag-in-production.md` | Post: "RAG in production: what the demos don't tell you." Contains the architecture diagram + two concept charts. |

Blog posts render through `src/layouts/WritingLayout.astro`, which mirrors the
homepage's design tokens so posts feel part of the same site.

Homepage sections (in order): nav → hero (+ trust strip) → services (`#services`)
→ security & governance (`#governance`) → selected work (`#work`) → experience
(`#experience`) → writing (`#writing`) → contact/footer (`#contact`).

---

## 3. Positioning & messaging decisions

These are the *why* behind the copy. Read before rewriting anything.

### "Embedded", never "forward deployed"
The site used to call the engagement model *forward deployed consultant*
(borrowed from Palantir). Dropped it: it's insider jargon that makes an
enterprise buyer stop and decode instead of understand. Replaced everywhere with
plain **"embedded in your team."** Same differentiator (I build inside the
business vs. advising from a deck), no buzzword. The old post
`forward-deployed-consultant.md` was rewritten and renamed to
`demo-to-production.md` (URL changed — see TODOs for the redirect).
Tradeoff we accepted: "embedded" is clearer but less distinctive than the old
term; clarity wins for enterprise.

### "Generative AI" is placed deliberately, not sprayed
The content leans on "AI", "LLM", "RAG". We added the exact phrase **"generative
AI"** (the term execs, budgets, and RFPs actually use) in five high-value spots
only: `<title>`, meta description, hero lede, services intro, and the closing
CTA. "GenAI" appears once, in the meta description, to catch that search
variant. Everywhere else stays "AI" as natural shorthand — repeating "generative
AI" 30× would read as marketing and undercut the tone. The big visual `<h1>`
still says "AI in your company" (adding "Generative" makes the 84px headline
wrap and lose punch); the lede beneath it supplies the precise term.

### Enterprise repositioning
The strongest asset for enterprise buyers — a track record inside **RBC, BMO,
Bell Media, CIBC/Simplii** — was buried in the experience list. Two additions
surfaced it:
- **Trust strip** in the hero: `TRUSTED WITH PRODUCTION SYSTEMS AT` + the four
  names, as a text logo-bar (names, not logos — using a bank's trademark can
  imply an endorsement we haven't cleared).
- **Security & governance section** (`#governance`): six points speaking the
  enterprise buyer's real fears — data stays in your cloud, access control at
  the retrieval layer, auditable by design, model-neutral, works inside your
  NDA/MSA/security review, evals+monitoring from day one.
  ⚠️ These six points are **promises that set client expectations.** Confirm each
  is deliverable on every engagement before leaning on it (esp. "never used to
  train a model", which depends on the provider tier, and being able to sign an
  MSA).

### The honesty rule (important)
Credibility is the product, so nothing on the site may claim a result it can't
defend. Concretely:
- **Blog posts** may carry **illustrative concept charts** — clearly captioned
  "Illustrative — not measured." They teach an argument; they are not results.
- **Homepage / case studies** may carry a chart **only when backed by real
  numbers.** A chart in a marketing context reads as a measured results claim.
  We have not added outcome charts/stats yet because we don't have real figures
  (see TODOs). **Do not fabricate metrics.**

### Restraint principle for visuals
No generic "AI" stock art (glowing brains, neural nets, robot hands) — it's the
fastest way to look like every other AI landing page. A visual earns its place
only if it *proves* something (architecture, a real tradeoff), not if it fills
space. Ceiling is ~3 visuals per post before an essay starts to feel like a
slide deck; the RAG post is at that ceiling.

---

## 4. Design system

Tokens are defined identically in `index.astro`, `WritingLayout.astro`, and
`writing/index.astro` (`:root`). The site is **light-mode only** (no dark-mode
handling).

| Token | Value | Use |
|---|---|---|
| `--bg` | `#ffffff` | page background |
| `--ink` | `#101418` | primary text |
| `--gray` | `#5b6470` | secondary text, metadata |
| `--hairline` | `#e6e8eb` | borders, dividers |
| `--accent` | `#2547f4` | links, highlights, the one thing that matters |
| `--sans` | Instrument Sans | display + body |
| `--mono` | IBM Plex Mono | labels, dates, tags, captions |

Conventions: mono for metadata/labels; hairline 1px dividers between sections;
scroll-reveal via IntersectionObserver (respects `prefers-reduced-motion` and
degrades gracefully with JS off); contact form posts to **Web3Forms** (public
access key ships in the HTML by design) with a JS-enhanced inline submit + a
honeypot field; Google Analytics (`gtag`, `G-1KVEFPH9TZ`) is inlined verbatim on
each page.

---

## 5. Visuals — how the diagrams & charts are built

All visuals are **inline SVG** — no image files, no network requests, crisp at
any zoom, and they inherit the palette. There are two styling approaches in use,
and one real pitfall:

- **Homepage SVG (Olotalk diagram):** styled with **presentation attributes +
  literal hex** (`fill="#2547f4"` etc.), *no* nested `<style>`. This sidesteps
  Astro's `<style is:global>` scoper. Prefer this approach for SVG on `.astro`
  pages.
- **Blog SVG (RAG diagram):** uses an internal `<style>` block with CSS classes
  referencing `var(--...)`. Fine inside markdown (Astro doesn't scope raw HTML
  `<style>` in `.md`).
- ⚠️ **Pitfall:** `var(--x)` does **not** resolve in an SVG *presentation
  attribute* (e.g. `stroke="var(--hairline)"` renders as no stroke). CSS custom
  properties only work in a CSS context (a `style=""` attribute or a `<style>`
  rule). Use hex in attributes, or move the color into a class.

Current visuals:
1. **Olotalk architecture diagram** — `index.astro`, inside the Olotalk `<details>`
   card. Slim 5-box vertical flow (INGEST / SERVE), Olotalk-specific.
2. **RAG pipeline diagram** — `rag-in-production.md`, after the intro. 8-node
   vertical flow; the parts a demo skips (permissions, re-rank, citations, evals)
   are in accent.
3. **Two concept charts** — `rag-in-production.md`: "Retrieval quality" (bars)
   and "Where a request spends its time" (stacked bar). Both captioned
   illustrative.

To preview an SVG in isolation while editing: extract it, wrap in a minimal HTML
page, and render headless (Chrome `--headless --screenshot`). Note that
standalone previews fall back to system fonts because the Google Fonts aren't
loaded — the live site renders in Instrument Sans / IBM Plex Mono.

---

## 6. Change log — 2026-07-09 session

1. **Dropped "forward deployed"** everywhere → "embedded." Rewrote + renamed the
   post `forward-deployed-consultant.md` → `demo-to-production.md` ("The gap
   between an AI demo and production"), keeping the thesis, dropping the Palantir
   framing.
2. **Enterprise repositioning:** added the hero **trust strip** (RBC · BMO · Bell
   Media · CIBC/Simplii) and the **Security & governance** section (6 points) +
   its nav link.
3. **"Generative AI" naming:** inserted deliberately into title, meta
   description, hero lede, services intro, and closing CTA; "GenAI" once in the
   description.
4. **Visuals:** Olotalk architecture diagram (homepage), RAG pipeline diagram
   (blog), and two illustrative concept charts (blog).
5. **This doc** + README pointer.

---

## 7. Open TODOs / next steps

Ranked by value. The top two need something only Gustave can provide.

- [ ] **Headshot.** The biggest remaining trust gap — the site is faceless, and
  the pitch is "let a person into your team." Add a real photo to the hero.
- [ ] **Real outcome numbers** (Olotalk / BMO / RBC). Unlocks honest stat blocks
  or charts on the homepage case studies — the highest-selling spot. Needed
  before any homepage results visual.
- [ ] **301 redirect** `/writing/forward-deployed-consultant` →
  `/writing/demo-to-production` if the old URL was ever shared publicly.
- [ ] **Reframe "Canadian SMBs"** in the Olotalk case study — signals down-market
  for an enterprise pitch. Consider an enterprise-scale framing.
- [ ] **Strengthen the "work with my team" model** for enterprise (accountability,
  staffing a senior pod) — currently thin.
- [ ] **Optional:** thread "generative AI" into the two blog post openings for
  whole-site consistency; a tasteful tech-stack strip (AWS · Azure · Qdrant ·
  Kubernetes · Next.js).
- [ ] **Verify the governance promises** are all deliverable (see §3).

---

## 8. Build & run

```bash
npm run dev      # local dev server
npm run build    # static build → dist/
```

Deploy tooling lives in `deploy.sh` / `deploy/` with `.deploy.env.example` as the
config template. Production hosting notes are in the maintainer's separate infra
memory (Linode box), not this repo.
