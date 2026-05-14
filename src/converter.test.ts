import { htmlToMarkdown } from "./converter";

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
});
