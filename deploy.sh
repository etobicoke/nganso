#!/usr/bin/env bash
#
# Build the site and deploy the static dist/ to the Linode over rsync + SSH.
#
#   ./deploy.sh
#
# Target is configured in .deploy.env (copy .deploy.env.example -> .deploy.env).
# .deploy.env is gitignored, so host and key paths stay off GitHub.

set -euo pipefail
cd "$(dirname "$0")"

# Load local, gitignored deploy config if present.
if [ -f .deploy.env ]; then
  set -a; . ./.deploy.env; set +a
fi

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-root}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/nganso}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
SSH_KEY="${SSH_KEY:-}"

if [ -z "$DEPLOY_HOST" ]; then
  echo "✗ DEPLOY_HOST is not set." >&2
  echo "  Copy .deploy.env.example to .deploy.env and fill in your Linode host." >&2
  exit 1
fi

SSH_CMD="ssh -p ${DEPLOY_PORT}"
if [ -n "$SSH_KEY" ]; then
  SSH_CMD="$SSH_CMD -i ${SSH_KEY}"
fi

echo "→ Building production bundle…"
npm run build

echo "→ Syncing dist/ → ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
rsync -avz --delete \
  --exclude '.well-known' \
  -e "${SSH_CMD}" \
  dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "✓ Deployed to ${DEPLOY_HOST}."
