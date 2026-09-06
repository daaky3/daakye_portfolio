# Cloudflare Workers deployment

This project builds with Nitro's `cloudflare_module` preset.

## Commands

```text
npm install
npm run build:cloudflare
npm run dev:cloudflare
npm run deploy:cloudflare
```

`npm run build:cloudflare` generates the Worker bundle at `.output/server/index.mjs`, static assets at `.output/public`, and the Wrangler configuration at `.output/server/wrangler.json`.

`npm run deploy:cloudflare` uses Nitro's prebuilt deploy flow. Authenticate Wrangler once with `npx wrangler login` before deploying.

## Cloudflare settings

The generated Worker uses:

- Compatibility date: `2026-09-06`
- Compatibility flag: `nodejs_compat`
- Static asset binding: `ASSETS`

Add production environment variables and secrets in the Cloudflare dashboard or with Wrangler. Do not commit secrets or create a `.env` file.

The current portfolio and CV routes do not require a database. If authentication or database-backed routes are enabled later, use Cloudflare-compatible bindings or a fetch-based database driver rather than a long-lived Node `pg` pool inside the Worker.
