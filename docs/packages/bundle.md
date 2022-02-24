---
layout: default
nav: Bundle
title: "Bundle"
parent: Packages
description: ""
nav_order: 1
permalink: /packages/bundle
---

# @easepick/bundle
{: .no_toc }

Bundle of easepick.  
Includes all packages.

## Quick example
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.0/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.0/dist/index.css',
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

## Initialization
```js
  const picker = new easepick.create({
    element: document.getElementById('datepicker'),
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.0/dist/index.css',
    ],
  });
```

## Options
See documentation in other [packages](/packages).