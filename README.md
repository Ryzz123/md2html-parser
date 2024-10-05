# md2html-parser

`md2html-parser` adalah library sederhana yang berfungsi untuk mengonversi teks berformat Markdown menjadi HTML dengan mudah dan cepat.

## Instalasi

Untuk menginstal `md2html-parser`, gunakan npm:

```bash
npm i md2html-parser
```
## Penggunaan
Berikut adalah contoh penggunaan dasar `md2html-parser`:

```js
import mdhtml from "md2html-parser";

const html = await mdhtml({
    text: "# Hello World\n\nThis is a markdown example.",
    theme: "dark",
    title: "This is a markdown example."
});

console.log(html);
```
### Opsi Konfigurasi

`md2html-parser` menyediakan beberapa opsi konfigurasi yang dapat digunakan untuk menyesuaikan hasil konversi:

- `text`: Teks berformat Markdown yang akan dikonversi.
- `theme`: Tema untuk hasil HTML. Pilihan: `"light"`, `"dark"`.
- `title`: Judul dari dokumen HTML.

### Contoh Penggunaan Lanjutan

Berikut adalah contoh penggunaan lanjutan `md2html-parser` dengan opsi konfigurasi tambahan:

```js
import mdhtml from "md2html-parser";

const html = await mdhtml({
    text: `
# Hello World

This is a markdown example with **bold text** and *italic text*.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Conclusion](#conclusion)

## Introduction

This is the introduction section.

## Usage

This is the usage section.

\`\`\`js
console.log("Hello, world!");
\`\`\`

## Conclusion

This is the conclusion section.
`,
    theme: "light",
    title: "Advanced Markdown Example"
});

console.log(html);
```

### Lisensi

`md2html-parser` dilisensikan di bawah [MIT License](LICENSE).