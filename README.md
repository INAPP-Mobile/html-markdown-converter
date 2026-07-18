---
name: HTML and Markdown Converter
description: A lightweight REST API that converts HTML to Markdown and Markdown to HTML using Turndown and marked. Deploy on Railway with one click.
---

# HTML and Markdown Converter

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/html-to-markdown-converter)

A lightweight, bidirectional REST API for converting HTML to Markdown using [Turndown](https://github.com/mixmark-io/turndown) and Markdown to HTML using [marked](https://github.com/markedjs/marked). Deploy on Railway with zero configuration.

## Features

- Fast HTML to Markdown conversion
- Fast Markdown to HTML conversion
- RESTful API with health check and bidirectional conversion endpoints (`/convert`, `/convert-md`)
- **Configurable** — control heading style, list markers, code blocks, emphasis delimiters, and more
- **CORS-enabled** — call directly from browser-based clients
- TypeScript with full type safety
- Error handling for invalid input
- **Multi-stage Docker build** — smaller, more secure production image (Node 22, non-root user)
- Railway template metadata (`railway.json`) for a polished marketplace listing

## Deploy to Railway

### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/html-to-markdown-converter)

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

#### GET `/health`
JSON health check. Returns version and uptime information.

```json
{
  "status": "ok",
  "version": "1.0.0",
  "uptime": 1234
}
```

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

##### With Options
All Turndown options are supported via an optional `options` field:

```json
{
  "html": "<h1>Hello World</h1><ul><li>Item 1</li><li>Item 2</li></ul>",
  "options": {
    "headingStyle": "atx",
    "bulletListMarker": "-",
    "codeBlockStyle": "fenced",
    "emDelimiter": "*",
    "strongDelimiter": "**",
    "linkStyle": "inlined",
    "linkReferenceStyle": "full"
  }
}
```

Available options:

| Option | Values | Default |
|---|---|---|
| `headingStyle` | `setext`, `atx` | `setext` |
| `hr` | any string | `---` |
| `bulletListMarker` | `-`, `+`, `*` | `*` |
| `codeBlockStyle` | `indented`, `fenced` | `indented` |
| `fence` | `` ``` ``, `~~~` | `` ``` `` |
| `emDelimiter` | `_`, `*` | `_` |
| `strongDelimiter` | `**`, `__` | `**` |
| `linkStyle` | `inlined`, `referenced` | `inlined` |
| `linkReferenceStyle` | `full`, `collapsed`, `shortcut` | `full` |
| `preformattedCode` | `true`, `false` | `false` |

Omitting `options` entirely (or passing an empty object) uses defaults — fully backward compatible.

#### POST `/convert-md`
Converts Markdown to HTML.

**Request:**
```json
{
  "markdown": "# Hello World\n\nThis is a **test**."
}
```

**Response:**
```json
{
  "html": "<h1>Hello World</h1>\n<p>This is a <strong>test</strong>.</p>\n"
}
```

##### With Options
Markdown conversion supports an optional `options` field:

| Option | Values | Default | Description |
|---|---|---|---|
| `gfm` | `true`, `false` | `true` | GitHub Flavored Markdown (tables, strikethrough, task lists, autolinks) |
| `breaks` | `true`, `false` | `false` | Render single newlines (`\n`) as `<br>` |

Omitting `options` entirely (or passing an empty object) uses defaults.

### Example with curl

```bash
# Basic HTML -> Markdown conversion
curl -X POST https://your-service.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Hello World</h1><p>This is a <strong>test</strong>.</p>"}'

# HTML -> Markdown with options
curl -X POST https://your-service.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Hello</h1>", "options": {"headingStyle": "atx"}}'

# Markdown -> HTML conversion
curl -X POST https://your-service.up.railway.app/convert-md \
  -H "Content-Type: application/json" \
  -d '{"markdown": "# Hello\n\nThis is **bold**."}'

# Markdown -> HTML with breaks enabled
curl -X POST https://your-service.up.railway.app/convert-md \
  -H "Content-Type: application/json" \
  -d '{"markdown": "line one\nline two", "options": {"breaks": true}}'

# Health check
curl https://your-service.up.railway.app/health
```

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/INAPP-Mobile/html-markdown-converter
cd html-markdown-converter
cp .env.example .env
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

The multi-stage Dockerfile produces a minimal production image based on `node:22-alpine` running as a non-root user.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on (Railway sets this automatically) |

## Customization

Edit `src/converter.ts` to add custom Turndown rules or marked options. See the [Turndown documentation](https://github.com/mixmark-io/turndown#custom-rules) for available options, and the [marked documentation](https://marked.js.org/using_advanced) for advanced Markdown rendering options.

## Project Structure

```text
.
├── .dockerignore          # Ignored files for Docker builds
├── .env.example           # Example environment variables
├── railway.json           # Railway template metadata
├── Dockerfile             # Multi-stage production build
├── src/
│   ├── index.ts           # Server entrypoint (listens on PORT)
│   ├── app.ts             # Express app & routes (/convert, /convert-md)
│   ├── converter.ts       # HTML ↔ Markdown conversion logic
│   ├── converter.test.ts  # Unit tests for conversion functions
│   └── api.test.ts        # API endpoint tests
└── package.json
```

## License

MIT
