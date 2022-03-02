---
layout: default
nav: time-plugin
title: "@easepick/time-plugin"
parent: Packages
description: ""
nav_order: 9
permalink: /packages/time-plugin
---

# @easepick/time-plugin
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Ftime-plugin.svg)](https://www.npmjs.com/package/@easepick/time-plugin)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

Adds time picker.

## Quick example
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version.number]/dist/index.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/time-plugin@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
          'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@[version.number]/dist/index.css',
        ],
        plugins: ['TimePlugin'],
        TimePlugin: {
          format: 'HH:mm',
        },
      });
    </script>
  </body>
</html>
```

## Installation

#### NPM

```bash
npm install @easepick/core @easepick/time-plugin
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/time-plugin@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/):

```ts
import { easepick } from '@easepick/core';
import { TimePlugin } from '@easepick/time-plugin';

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@[version.number]/dist/index.css',
  ],
  plugins: [TimePlugin],
});
```

Another way to initialize `easypick`:

```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@[version.number]/dist/index.css',
  ],
  plugins: ['TimePlugin'],
});
```

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| {{ 'format' | anchor_tag: 'option' }} | string | HH:mm | The default output format. <br/> See [tokens format](/packages/datetime#tokens-format).
| {{ 'append' | anchor_tag: 'option' }} | string | 'start' | 
| {{ 'seconds' | anchor_tag: 'option' }} | boolean | false | 
| {{ 'stepHours' | anchor_tag: 'option' }} | number | 1 | 
| {{ 'stepMinutes' | anchor_tag: 'option' }} | number | 5 | 
| {{ 'stepSeconds' | anchor_tag: 'option' }} | number | 5 | 
| {{ 'format12' | anchor_tag: 'option' }} | boolean | false | 
