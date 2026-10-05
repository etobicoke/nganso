# nganso.com

Astro static site. Positioning, design and open TODOs live in
`docs/site-notes.md` — read it before changing copy or visuals.

- Dev server: `npm run dev` → http://localhost:2336 (port is pinned; 3000 is
  taken by other local projects).
- Main branch is `master`.

## Commit messages

Conventional Commits with a scope. The template is `.gitmessage`.

```
type(scope): what changed, imperative, ≤ 60 chars

Why it changed, if not obvious. Wrap at 72 columns.
```

| Type | Use for |
|---|---|
| `feat` | a new capability (page, section, component) |
| `fix` | something was broken and now works |
| `content` | copy, blog posts, resume — words, not code |
| `style` | visual or CSS changes only |
| `refactor` | code restructure with no behaviour change |
| `chore` | dependencies, tooling, config |
| `deploy` | deploy scripts, nginx, hosting |
| `docs` | `docs/`, README, this file |
| `demo` | Olotalk integration experiments |

Scopes: `home`, `writing`, `contact`, `search`, `seo`, `resume`, `styles`,
`deps`, `dev`, `deploy`. Omit the scope only when a change spans the whole
site.

Rules:
- Imperative, lowercase subject: "add", not "added" or "Adds". No trailing
  period.
- No `TODO` in a subject — a commit records something done.
- One logical change per commit; split mixed work (e.g. copy changes and a
  new feature) into separate commits.
- `refactor` only when nothing visible changes.

Examples:
- `feat(contact): route all contact through the form`
- `content(writing): add post on RAG evals`
- `chore(dev): pin dev server to port 2336`
- `fix(search): close palette on Escape in Safari`
