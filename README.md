# HTML to Markdown Converter Template

A lightweight, efficient template for converting HTML to Markdown using TypeScript and Node.js, designed for easy deployment on Railway.

## Features

- 🚀 Fast HTML to Markdown conversion using [Turndown](https://github.com/mixmark-io/turndown)
- 🌐 RESTful API endpoint for conversion
- 🩺 Health check endpoint
- 📦 Ready for deployment on Railway
- 🛠️ TypeScript support with excellent developer experience
- 🐳 Dockerfile included for containerized deployment
- ✅ Comprehensive error handling

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Example Request](#example-request)
- [Deployment](#deployment)
  - [Deploying to Railway](#deploying-to-railway)
  - [Deploying with Docker](#deploying-with-docker)
- [Configuration](#configuration)
- [Customization](#customization)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd html-markdown-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with hot-reload:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

To build the project for production:

```bash
npm run build
```

This will compile the TypeScript code to JavaScript in the `dist` directory.

## Usage

### API Endpoints

#### GET `/`
Health check endpoint to verify the service is running.

**Response:**
```text
HTML to Markdown Converter is running!
```

#### POST `/convert`
Converts HTML string to Markdown.

**Request Body:**
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

**Error Responses:**
- 400 Bad Request: If the `html` field is missing or not a string
- 500 Internal Server Error: If an error occurs during conversion

### Example Request with curl

```bash
curl -X POST http://localhost:3000/convert \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Hello World</h1><p>This is a <strong>test</strong>.</p>"}'
```

## Deployment

### Deploying to Railway

1. Push your code to a GitHub repository.
2. In the Railway dashboard, click "New Project" and select "Deploy from GitHub".
3. Choose your repository.
4. Railway will automatically detect the `.railway.json` file and use the build and start commands defined therein.
5. Set the `PORT` environment variable if needed (Railway sets this automatically).
6. Your service will be deployed and accessible via the provided URL.

### Deploying with Docker

1. Build the Docker image:
   ```bash
   docker build -t html-markdown-converter .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 html-markdown-converter
   ```

3. The service will be available at `http://localhost:3000`.

## Configuration

The service uses the following environment variables:

- `PORT`: The port on which the server listens (defaults to 3000)

## Customization

### Modifying Conversion Behavior

The conversion logic is in `src/converter.ts`. You can customize the Turndown service by modifying the `htmlToMarkdown` function.

For example, to change the heading style to ATX:

```typescript
export function htmlToMarkdown(html: string): string {
  const turndownService = new TurndownService({ headingStyle: 'atx' });
  return turndownService.turndown(html);
}
```

To add custom rules, refer to the [Turndown documentation](https://github.com/mixmark-io/turndown#custom-rules).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Turndown](https://github.com/mixmark-io/turndown) for the HTML to Markdown conversion
- [Express.js](https://expressjs.com/) for the web framework
- [TypeScript](https://www.typescriptlang.org/) for type safety