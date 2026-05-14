import express, { Request, Response } from 'express';
import { htmlToMarkdown } from './converter';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('HTML to Markdown Converter is running!');
});

// Conversion endpoint
app.post('/convert', (req: Request, res: Response) => {
  try {
    const { html } = req.body;

    if (!html || typeof html !== 'string') {
      return res.status(400).json({ error: 'Invalid input: HTML string is required' });
    }

    const markdown = htmlToMarkdown(html);
    res.json({ markdown });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Internal server error during conversion' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
