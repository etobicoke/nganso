# Deploying nganso.com

The site is a **static Astro build**. `deploy.sh` builds it and rsyncs `dist/`
to the Linode. No Node process runs in production.

## How production is wired

nganso.com shares one Linode with wemba-sop-nkombou.com, olochat.ca and
santeclubetobicoke.ca. Two Caddy layers sit in front of the files:

```
visitor ──TLS──▶ edge Caddy (/opt/edge, ports 80/443, all four domains)
                    │  reverse_proxy nganso:80   (Docker network docker_default)
                    ▼
                 sites-nganso-1  (caddy:2, compose project /opt/sites)
                    │  serves /srv, read-only
                    ▼
                 /opt/sites/nganso/dist   ◀── deploy.sh rsyncs dist/ here
```

- **Edge Caddy** terminates HTTPS for every site on the box. Its Caddyfile and
  compose file live in the olochat repository under `infra/edge/` — change
  domains or TLS there, not here.
- **`sites-nganso-1`** is a plain file server. Its compose file
  (`/opt/sites/docker-compose.yml`) exists only on the server.
- A deploy only replaces files in `/opt/sites/nganso/dist`; they are live as
  soon as rsync finishes, with no restart.
- Preview without DNS: `http://nganso.172-105-3-154.nip.io`.

## Deploying (from your machine)

1. Copy `../.deploy.env.example` to `../.deploy.env` and fill in the host and
   the SSH key. The user is `deploy`; the key is the same one the wemba
   project deploys with.
2. Run:
   ```sh
   ./deploy.sh
   ```
3. Check `https://nganso.com`, and send a test message through the contact
   form — it is the site's only contact path.

`rsync --delete` makes the server folder an exact copy of `dist/`: anything not
in the build is removed. Never point `DEPLOY_PATH` at another site's folder.

## CI

No CI is wired up — deploys are manual (`./deploy.sh`). If you want
push-to-deploy later, a GitHub Action can run the same `rsync` step.
