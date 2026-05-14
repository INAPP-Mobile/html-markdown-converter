import TurndownService from 'turndown';

/**
 * Converts HTML string to Markdown string.
 * @param html - The HTML string to convert.
 * @returns The Markdown string.
 */
export function htmlToMarkdown(html: string): string {
  const turndownService = new TurndownService();
  return turndownService.turndown(html);
}

// Optional: If you want to customize the rules, you can do so here.
// For example, to preserve certain HTML tags or change the heading style.
// const turndownService = new TurndownService({ headingStyle: 'atx' });
// turndownService.addRule('strikethrough', {
//   filter: ['del', 's', 'strike'],
//   replacement: function (content) {
//     return `~~${content}~~`;
//   }
// });
