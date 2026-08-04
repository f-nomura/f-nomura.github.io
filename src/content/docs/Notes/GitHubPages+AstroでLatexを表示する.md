---
title: GitHub Pages + Astro のサイトで Latex を表示する
---
## A. プラグインを導入する
`package.json` を開き、以下の２つを追加します。  
- `remark-math`: Markdown の数式構文を処理するためのプラグイン
- `rehype-katex`: KaTeX で数式を HTML として描画するためのプラグイン

**追加前**
```json
{
  "name": "electrical-escape",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/starlight": "^0.38.3",
    "astro": "^6.0.1",
    "sharp": "^0.34.2"
  }
}
```

**追加後**
```json
{
  "name": "electrical-escape",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/starlight": "^0.38.3",
    "astro": "^6.0.1",
    "rehype-katex": "^7.0.1",
    "remark-math": "^6.0.0",
    "sharp": "^0.34.2"
  }
}
```

## B. Astro の設定を追加する
`astro.config.mjs` に、Markdown の数式変換設定を追加します。

```js
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
```


その後、`npm install` を実行して依存関係を反映しました。

