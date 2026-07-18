import TurndownService from 'turndown';
import { marked } from 'marked';

/**
 * Options that can be passed to the converter.
 * Maps directly to TurndownService options.
 */
export interface ConversionOptions {
  headingStyle?: 'setext' | 'atx';
  hr?: string;
  bulletListMarker?: '-' | '+' | '*';
  codeBlockStyle?: 'indented' | 'fenced';
  fence?: '```' | '~~~';
  emDelimiter?: '_' | '*';
  strongDelimiter?: '**' | '__';
  linkStyle?: 'inlined' | 'referenced';
  linkReferenceStyle?: 'full' | 'collapsed' | 'shortcut';
  preformattedCode?: boolean;
}

/**
 * Converts HTML string to Markdown string.
 * @param html - The HTML string to convert.
 * @param options - Optional Turndown configuration overrides.
 * @returns The Markdown string.
 */
export function htmlToMarkdown(html: string, options?: ConversionOptions): string {
  const turndownService = new TurndownService(options ?? {});
  return turndownService.turndown(html);
}

/**
 * Options that can be passed to the Markdown-to-HTML converter.
 * Maps directly to marked options.
 */
export interface MarkdownConversionOptions {
  /** Use GitHub Flavored Markdown (tables, strikethrough, task lists, autolinks). Default: true */
  gfm?: boolean;
  /** Render line breaks (`\n`) as `<br>`. Default: false */
  breaks?: boolean;
}

/**
 * Converts a Markdown string to an HTML string.
 * @param markdown - The Markdown string to convert.
 * @param options - Optional marked configuration overrides.
 * @returns The HTML string.
 */
export function markdownToHtml(markdown: string, options?: MarkdownConversionOptions): string {
  marked.setOptions({
    gfm: options?.gfm ?? true,
    breaks: options?.breaks ?? false,
  });
  return marked.parse(markdown) as string;
}
