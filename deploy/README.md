# Deploying nganso.com

The site is a **static Astro build**. `deploy.sh` builds it and rsyncs `dist/`
to a Linode where **nginx** serves the files. No Node process runs in
production.

## One-time server setup (Ubuntu Linode)

1. Install nginx:
   ```sh
   sudo apt update && sudo apt install -y nginx
   ```
2. Create the web root and let your deploy user write to it:
   ```sh
   sudo mkdir -p /var/www/nganso
   sudo chown -R "$USER":"$USER" /var/www/nganso
   ```
3. Install the site config (copy `nginx/nganso.conf` to the server first, e.g.
   `scp deploy/nginx/nganso.conf user@host:~/`):
   ```sh
   sudo cp nganso.conf /etc/nginx/sites-available/nganso.conf
   sudo ln -sf /etc/nginx/sites-available/nganso.conf /etc/nginx/sites-enabled/nganso.conf
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t && sudo systemctl reload nginx
   ```
4. Point DNS: an `A` record for `nganso.com` (and `www`) → your Linode's IP.
5. Add HTTPS:
   ```sh
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d nganso.com -d www.nganso.com
   ```
6. Retire the old PM2 process (nginx now serves the site):
   ```sh
   pm2 delete nganso && pm2 save
   ```

## Deploying (from your machine)

1. Copy `../.deploy.env.example` to `../.deploy.env` and fill in your host.
2. Run:
   ```sh
   ./deploy.sh
   ```

## CI

No CI is wired up — deploys are manual (`./deploy.sh`). The old Jenkins + PM2
pipeline has been removed in favour of building locally and serving static files
from nginx. If you want push-to-deploy later, a GitHub Action can run the same
`rsync` step.
