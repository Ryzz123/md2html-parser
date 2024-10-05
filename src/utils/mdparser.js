import * as marked from "marked";

/**
 * Encodes a string to its HTML entities.
 *
 * This function replaces special characters in the input string with their corresponding HTML entities.
 *
 * @param {string} str - The string to be encoded.
 * @returns {string} The encoded string with HTML entities.
 */
function htmlEncode(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/**
 * Parses the given Markdown text and converts it to HTML.
 * 
 * This function uses the `marked` library to parse the Markdown text and 
 * customize the rendering of code blocks. If the code block language is 
 * "mermaid", it wraps the code in a `<pre class="mermaid">` tag. For other 
 * languages, it wraps the code in a `<div>` with a header containing the 
 * language name and a copy button.
 * 
 * @param {string} mdText - The Markdown text to be parsed.
 * @returns {Promise<string>} - A promise that resolves to the parsed HTML string.
 */
const parseMarkdown = async (mdText) => {
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => {
    const encodedText = htmlEncode(text);
    if (lang === "mermaid") return `<pre class="mermaid">${encodedText}</pre>`;
    return `
        <div>
          <div class="head-code">
            <span class="lang">${lang}</span>
            <button class="copy-btn">
              Salin kode
            </button>
          </div>
        <pre><code class="language-${lang}">${encodedText}</code></pre>
        </div>
      `;
  };

  return marked.parse(mdText, {
    renderer,
  });
};

export default parseMarkdown;