# HTML to Markdown Converter

A lightweight REST API that converts HTML to Markdown using [Turndown](https://github.com/mixmark-io/turndown). Deploy on Railway with zero configuration.

# Deploy and Host

Click the Deploy button or clone the repo and deploy manually:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/html-to-markdown-converter)

## About Hosting

This service runs on Railway using a multi-stage Docker build (Node 22-alpine, non-root user). It starts an Express HTTP server on the port defined by the `PORT` environment variable.

## Why Deploy

- **Instant HTML to Markdown** — submit HTML, get clean Markdown back
- **Configurable output** — control heading style, list markers, code blocks, emphasis delimiters
- **CORS-enabled** — call directly from browser-based clients
- **Zero configuration** — just deploy and use

## Common Use Cases

- CMS content migration (HTML → Markdown)
- Blogging workflows that need raw HTML sanitized to Markdown
- API integration where downstream tools require Markdown input
- Browser extensions or web apps that need client-side HTML conversion

## Dependencies for

### Deployment Dependencies

- **Docker** — Railway handles the Docker build automatically
- **Node.js 22** — runtime environment (pre-installed in the build stage)
- **npm packages** — installed via `npm ci` during build
  - `express` — HTTP server framework
  - `turndown` — HTML to Markdown conversion engine
  - `cors` — Cross-Origin Resource Sharing middleware

## API Endpoints

### `GET /`
Health check. Returns plain text.

### `GET /health`
JSON health check (`status`, `version`, `uptime`).

### `POST /convert`
Convert HTML to Markdown. Accepts `{"html": "..."}` and optional `{"options": {...}}`.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server listen port (Railway sets this automatically) |
