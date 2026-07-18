import request from 'supertest';
import { app } from './app';

describe('API', () => {
  describe('GET /', () => {
    it('returns plain text health check', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.text).toBe('HTML to Markdown Converter is running!');
    });
  });

  describe('GET /health', () => {
    it('returns JSON health status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        status: 'ok',
        version: '1.0.0',
      });
      expect(res.body.uptime).toEqual(expect.any(Number));
    });
  });

  describe('POST /convert', () => {
    it('converts HTML to Markdown with defaults', async () => {
      const res = await request(app)
        .post('/convert')
        .send({ html: '<h1>Hello</h1>' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ markdown: 'Hello\n=====' });
    });

    it('returns 400 for missing html field', async () => {
      const res = await request(app)
        .post('/convert')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid input: HTML string is required' });
    });

    it('returns 400 for non-string html', async () => {
      const res = await request(app)
        .post('/convert')
        .send({ html: 123 });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid input: HTML string is required' });
    });

    it('converts with headingStyle: atx option', async () => {
      const res = await request(app)
        .post('/convert')
        .send({ html: '<h1>Title</h1>', options: { headingStyle: 'atx' } });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ markdown: '# Title' });
    });

    it('converts with bulletListMarker option', async () => {
      const res = await request(app)
        .post('/convert')
        .send({
          html: '<ul><li>A</li><li>B</li></ul>',
          options: { bulletListMarker: '-' },
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ markdown: '-   A\n-   B' });
    });

    it('converts with emphasis delimiters', async () => {
      const res = await request(app)
        .post('/convert')
        .send({
          html: '<p><strong>bold</strong> and <em>italic</em></p>',
          options: { emDelimiter: '*', strongDelimiter: '__' },
        });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ markdown: '__bold__ and *italic*' });
    });

    it('handles empty html string', async () => {
      const res = await request(app)
        .post('/convert')
        .send({ html: '' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ markdown: '' });
    });

    it('handles large HTML payloads', async () => {
      const paragraphs = Array(100)
        .fill('<p>Lorem ipsum dolor sit amet.</p>')
        .join('\n');
      const res = await request(app)
        .post('/convert')
        .send({ html: paragraphs });
      expect(res.status).toBe(200);
      expect(res.body.markdown).toContain('Lorem ipsum');
    });
  });

  describe('POST /convert-md', () => {
    it('converts Markdown to HTML with defaults', async () => {
      const res = await request(app)
        .post('/convert-md')
        .send({ markdown: '# Hello' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ html: '<h1>Hello</h1>\n' });
    });

    it('converts bold and italic text', async () => {
      const res = await request(app)
        .post('/convert-md')
        .send({ markdown: 'This is **bold** and _italic_.' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        html: '<p>This is <strong>bold</strong> and <em>italic</em>.</p>\n',
      });
    });

    it('converts a list', async () => {
      const res = await request(app)
        .post('/convert-md')
        .send({ markdown: '- Item 1\n- Item 2' });
      expect(res.status).toBe(200);
      expect(res.body.html).toBe('<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>\n');
    });

    it('returns 400 for missing markdown field', async () => {
      const res = await request(app)
        .post('/convert-md')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid input: Markdown string is required' });
    });

    it('returns 400 for non-string markdown', async () => {
      const res = await request(app)
        .post('/convert-md')
        .send({ markdown: 123 });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid input: Markdown string is required' });
    });

    it('renders <br> on single newlines when breaks is true', async () => {
      const res = await request(app)
        .post('/convert-md')
        .send({ markdown: 'line one\nline two', options: { breaks: true } });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ html: '<p>line one<br>line two</p>\n' });
    });
  });
});
