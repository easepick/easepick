---
layout: default
nav: preset-plugin
title: "@easepick/preset-plugin"
parent: Packages
description: ""
nav_order: 7
permalink: /packages/preset-plugin
---

# @easepick/preset-plugin
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Fpreset-plugin.svg)](https://www.npmjs.com/package/@easepick/preset-plugin)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

Adds predefined ranges.  

### Required:
* [@easepick/range-plugin](/packages/range-plugin)

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
    <script src="https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
          'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.css',
          'https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@[version.number]/dist/index.css',
        ],
        plugins: ['RangePlugin', 'PresetPlugin'],
        PresetPlugin: {
          position: 'left',
        },
      });
    </script>
  </body>
</html>
```

## Installation

#### NPM

```bash
npm install @easepick/core @easepick/preset-plugin
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/):

```ts
import { easepick } from '@easepick/core';
import { RangePlugin } from '@easepick/range-plugin';
import { PresetPlugin } from '@easepick/preset-plugin';

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@[version.number]/dist/index.css',
  ],
  plugins: [RangePlugin, PresetPlugin],
});
```

Another way to initialize `easypick`:

```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@[version.number]/dist/index.css',
  ],
  plugins: ['RangePlugin', 'PresetPlugin'],
});
```

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| [customPreset](#option-customPreset) | object | null | Define your own ranges.
| [customLabels](#option-customLabels) | ['Today', 'Yesterday',<br/> 'Last 7 Days', 'Last 30 Days',<br/> 'This Month', 'Last Month'] | null | Define your own labels.
| [position](#option-position) | string | 'left' | Position of preset block.