import TurndownService from 'turndown';

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
