---
layout: default
nav: amp-plugin
title: "@easepick/amp-plugin"
parent: Packages
description: ""
nav_order: 5
permalink: /packages/amp-plugin
---

# @easepick/amp-plugin
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Famp-plugin.svg)](https://www.npmjs.com/package/@easepick/amp-plugin)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

Adds extra options.

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
    <script src="https://cdn.jsdelivr.net/npm/@easepick/amp-plugin@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
        ],
        plugins: ['AmpPlugin'],
        AmpPlugin: {
          dropdown: {
            months: true,
            years: true,
          },
        },
      });
    </script>
  </body>
</html>
```

## Installation

#### NPM

```bash
npm install @easepick/core @easepick/amp-plugin
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/amp-plugin@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/):

```ts
import { easepick } from '@easepick/core';
import { AmpPlugin } from '@easepick/amp-plugin';

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
  ],
  plugins: [AmpPlugin],
});
```

Another way to initialize `easypick`:

```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
  ],
  plugins: ['AmpPlugin'],
});
```

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| [dropdown](#option-dropdown) | object | { minYear: 1950, maxYear: null, months: false, years: false } | Enable dropdowns for months, years. If `maxYear` is `null` then `maxYear` will be equal to `(new Date()).getFullYear()`. <br/> `years` can be equal to `asc` string to change the sort direction.
| [resetButton](#option-resetButton) | boolean <br/> function | false | Adds a reset button to clear the current selection. It is allowed to pass a custom function that must return `true` to clear the selection.
| [darkMode](#option-darkMode) | boolean | true | Allows dark mode to be used if the user's system settings are set to dark mode.
| [weekNumbers](#option-weekNumbers) | boolean | false | Show week numbers.
| [locale](#option-locale) | object | { resetButton: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>' } | Texts for Amp plugin options.
