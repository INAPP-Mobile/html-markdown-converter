---
name: HTML to Markdown Converter
description: A lightweight REST API that converts HTML to Markdown using Turndown. Deploy on Railway with one click.
---

# HTML to Markdown Converter

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new?template=https://github.com/INAPP-Mobile/html-markdown-converter)

A lightweight REST API for converting HTML to Markdown using [Turndown](https://github.com/mixmark-io/turndown). Deploy on Railway with zero configuration.

## Features

- Fast HTML to Markdown conversion
- RESTful API with health check and conversion endpoints
- TypeScript with full type safety
- Error handling for invalid input
- Docker support for local development

## Deploy to Railway

### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new?template=https://github.com/INAPP-Mobile/html-markdown-converter)

### Manual Deploy

1. Fork or clone this repository to your GitHub account.
2. In the [Railway dashboard](https://railway.app/new), click **New Project** → **Deploy from GitHub**.
3. Select your repository.
4. Railway auto-detects the Dockerfile and deploys — no configuration needed.
5. Access your service at the generated `*.railway.app` URL.

## Usage

### API Endpoints

#### GET `/`
Health check. Returns `HTML to Markdown Converter is running!`.

#### POST `/convert`
Converts HTML to Markdown.

**Request:**
```json
{
  "html": "<h1>Hello World</h1><p>This is a <strong>test</strong>.</p>"
}
```

**Response:**
```json
{
  "markdown": "# Hello World\n\nThis is a **test**."
}
```

### Example with curl

```bash
curl -X POST https://your-service.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Hello World</h1><p>This is a <strong>test</strong>.</p>"}'
```

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/INAPP-Mobile/html-markdown-converter
cd html-markdown-converter
npm install
npm run dev     # starts with hot-reload at http://localhost:3000
```

### Production build

```bash
npm run build
npm start       # serves from dist/
```

### Docker

```bash
docker build -t html-markdown-converter .
docker run -p 3000:3000 html-markdown-converter
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on (Railway sets this automatically) |

## Customization

Edit `src/converter.ts` to add custom Turndown rules. See the [Turndown documentation](https://github.com/mixmark-io/turndown#custom-rules) for available options.

## License

MIT
