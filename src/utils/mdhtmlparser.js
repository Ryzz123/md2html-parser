import * as cheerio from "cheerio";
import path from "path";
import fs from "fs";
import _process from "process";

/**
 * Parses markdown content and generates an HTML document with the specified theme and title.
 *
 * @param {Object} options - The options for the parser.
 * @param {string} options.markdown - The markdown content to be converted to HTML.
 * @param {string} options.theme - The theme to be applied to the HTML document (e.g., "dark" or "default").
 * @param {string} options.title - The title of the HTML document.
 *
 * @returns {string} The generated HTML content as a string.
 */
const mdHtmlParser = ({ 
    markdown, 
    theme = "dark", 
    title 
}) => {
  if(!title) {
    title = "Markdown Preview App";
  }

  if(theme !== "dark" && theme !== "default") {
    theme = "dark";
  }

  const htmlSourcePath = path.join(_process.cwd(), `node_modules/md2html-parser/src/templates/index.html`);
  const cssSourcePath = path.join(_process.cwd(), `node_modules/md2html-parser/src/templates/${theme}.css`);

  const htmlSource = fs.readFileSync(htmlSourcePath, "utf-8");
  const cssSource = fs.readFileSync(cssSourcePath, "utf-8");

  const mermaidOptions = Object.assign({
    startOnLoad: true,
    theme: theme === "dark" ? "dark" : "default",
  });

  const highlightJsOptions = Object.assign({
    theme: `atom-one-${theme}`,
  });

  const mathJaxOptions = Object.assign({});

  const $ = cheerio.load(htmlSource);
  $("head").append(`
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            ${cssSource}
        </style>
    `);

  $(".markdown-body").html(markdown);
  $("head").append(`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/styles/${highlightJsOptions.theme}.min.css">
        <script id="Highlight.js-script" defer="defer" type="text/javascript" src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11/build/highlight.min.js"></script>
        <script type="text/javascript">
          document.getElementById("Highlight.js-script").onload = function () {
            hljs.configure(${JSON.stringify(highlightJsOptions)});
            hljs.highlightAll();
          }
        </script>
    `);

  $("head").append(`
        <script id="MathJax-script" defer="defer" type="text/javascript" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        <script>
             MathJax = ${JSON.stringify(mathJaxOptions)}
        </script>
    `);

  $("head").append(`
        <script id="Mermaid-script" type="module">
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
          mermaid.initialize(${JSON.stringify(mermaidOptions)});
        </script>
    `);

  $("body").append(`
    <script>
    document.addEventListener("DOMContentLoaded", function () {
      const copyBtns = document.querySelectorAll(".copy-btn");

      copyBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const code = this.parentElement.nextElementSibling.innerText;

          navigator.clipboard.writeText(code).then(() => {
            this.innerText = "Berhasil disalin!";
            setTimeout(() => {
              this.innerText = "Salin kode";
            }, 2000);
          });
          copyBtns.forEach((otherBtn) => {
            if (otherBtn !== this) {
              otherBtn.innerText = "Salin kode";
            }
          });
        });
      });
    });
  </script>
    `);

  return $.html();
};

export default mdHtmlParser;
