---
layout: default
nav: "bundle"
title: "@easepick/bundle"
parent: "Packages"
description: ""
nav_order: 1
permalink: /packages/bundle
---

# @easepick/bundle
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Fbundle.svg)](https://www.npmjs.com/package/@easepick/bundle)
{: .image-link }

Bundle of easepick.  
Includes all packages.

## Quick example
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.css',
        ],
      });
    </script>
  </body>
</html>
```

## Installation

#### NPM

```bash
npm install @easepick/bundle
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/), you’ll need to import easepick.

```ts
import { easepick } from '@easepick/bundle';
```

Now you can create `easepick` instance.

```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.css',
  ],
});
```

## Options
See options in [@easepick/core](/packages/core#options) and other [packages](/packages).