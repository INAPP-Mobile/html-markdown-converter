import express, { Request, Response } from 'express';
import cors from 'cors';
import { htmlToMarkdown, ConversionOptions } from './converter';

const app = express();
const packageJson = require('../package.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint (plain text — original, kept for backward compat)
app.get('/', (req: Request, res: Response) => {
  res.send('HTML to Markdown Converter is running!');
});

// JSON health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: packageJson.version,
    uptime: Math.floor(process.uptime()),
  });
});

// Conversion endpoint
app.post('/convert', (req: Request, res: Response) => {
  try {
    const { html, options } = req.body;

    if (html === undefined || html === null || typeof html !== 'string') {
      return res.status(400).json({ error: 'Invalid input: HTML string is required' });
    }

    const markdown = htmlToMarkdown(html, options as ConversionOptions | undefined);
    res.json({ markdown });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Internal server error during conversion' });
  }
});

export { app };
