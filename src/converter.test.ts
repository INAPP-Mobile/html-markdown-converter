import { htmlToMarkdown } from "./converter";
import { markdownToHtml } from "./converter";

describe("htmlToMarkdown", () => {
  it("converts simple HTML to Markdown", () => {
    const html = "<h1>Hello</h1><p>World</p>";
    const expected = "Hello\n=====\n\nWorld";
    expect(htmlToMarkdown(html)).toBe(expected);
  });

  it("converts bold and italic text", () => {
    const html = "<p>This is <strong>bold</strong> and <em>italic</em>.</p>";
    const expected = "This is **bold** and _italic_.";
    expect(htmlToMarkdown(html)).toBe(expected);
  });

  it("converts unordered list", () => {
    const html = "<ul><li>Item 1</li><li>Item 2</li></ul>";
    const expected = "*   Item 1\n*   Item 2";
    expect(htmlToMarkdown(html)).toBe(expected);
  });

  it("converts ordered list", () => {
    const html = "<ol><li>First</li><li>Second</li></ol>";
    const expected = "1.  First\n2.  Second";
    expect(htmlToMarkdown(html)).toBe(expected);
  });

  it("handles empty string", () => {
    expect(htmlToMarkdown("")).toBe("");
  });

  it("preserves line breaks from block elements", () => {
    const html = "<div>Hello</div><div>World</div>";
    // Turndown converts div to text with a blank line between
    const expected = "Hello\n\nWorld";
    expect(htmlToMarkdown(html)).toBe(expected);
  });

  describe("with options", () => {
    it("uses atx heading style when specified", () => {
      const html = "<h1>Hello</h1><h2>World</h2>";
      const result = htmlToMarkdown(html, { headingStyle: "atx" });
      expect(result).toBe("# Hello\n\n## World");
    });

    it("uses dash bullet list marker when specified", () => {
      const html = "<ul><li>One</li><li>Two</li></ul>";
      const result = htmlToMarkdown(html, { bulletListMarker: "-" });
      expect(result).toBe("-   One\n-   Two");
    });

    it("uses fenced code blocks when specified", () => {
      const html = "<pre><code>const x = 1;</code></pre>";
      const result = htmlToMarkdown(html, { codeBlockStyle: "fenced" });
      expect(result).toBe("```\nconst x = 1;\n```");
    });

    it("uses asterisk emphasis when specified", () => {
      const html = "<p>This is <em>italic</em>.</p>";
      const result = htmlToMarkdown(html, { emDelimiter: "*" });
      expect(result).toBe("This is *italic*.");
    });
  });
});

describe("markdownToHtml", () => {
  it("converts a heading to an h1", () => {
    expect(markdownToHtml("# Hello")).toBe("<h1>Hello</h1>\n");
  });

  it("converts bold and italic text", () => {
    expect(markdownToHtml("This is **bold** and _italic_.")).toBe(
      "<p>This is <strong>bold</strong> and <em>italic</em>.</p>\n"
    );
  });

  it("converts an unordered list", () => {
    expect(markdownToHtml("- Item 1\n- Item 2")).toBe(
      "<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>\n"
    );
  });

  it("converts an ordered list", () => {
    expect(markdownToHtml("1. First\n2. Second")).toBe(
      "<ol>\n<li>First</li>\n<li>Second</li>\n</ol>\n"
    );
  });

  it("converts inline code and code blocks", () => {
    const result = markdownToHtml("Use `foo()` here");
    expect(result).toBe("<p>Use <code>foo()</code> here</p>\n");
  });

  it("converts a fenced code block", () => {
    const md = "```js\nconst x = 1;\n```";
    const result = markdownToHtml(md);
    expect(result).toContain("<pre><code class=\"language-js\">");
    expect(result).toContain("const x = 1;");
  });

  it("handles empty string", () => {
    expect(markdownToHtml("")).toBe("");
  });

  it("escapes HTML in the source text", () => {
    const result = markdownToHtml("A < B & C > D");
    expect(result).toBe("<p>A &lt; B &amp; C &gt; D</p>\n");
  });

  describe("with options", () => {
    it("renders <br> on single newlines when breaks is true", () => {
      const result = markdownToHtml("line one\nline two", { breaks: true });
      expect(result).toBe("<p>line one<br>line two</p>\n");
    });

    it("does not render <br> on single newlines when breaks is false", () => {
      const result = markdownToHtml("line one\nline two", { breaks: false });
      expect(result).toBe("<p>line one\nline two</p>\n");
    });
  });
});
