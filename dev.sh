#!/usr/bin/env bash
#
# Run the nganso.com site locally on http://localhost:2336
#
#   ./dev.sh            start the dev server (installs deps on first run)
#   ./dev.sh --host     also expose it on your local network (phones, etc.)
#
# Equivalent to `npm run dev`. Port is pinned in package.json.

set -euo pipefail
cd "$(dirname "$0")"

# Install dependencies on first run.
if [ ! -d node_modules ]; then
  echo "→ Installing dependencies (first run)…"
  npm install
fi

echo "→ Starting dev server on http://localhost:2336"
exec npm run dev -- "$@"
