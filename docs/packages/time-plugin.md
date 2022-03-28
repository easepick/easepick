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
| [seconds](#option-seconds) | boolean | false | Enable seconds picker.
| [stepHours](#option-stepHours) | number | 1 | Step for hours.
| [stepMinutes](#option-stepMinutes) | number | 5 | Step for minutes.
| [stepSeconds](#option-stepSeconds) | number | 5 | Step for seconds.
| [format12](#option-format12) | boolean | false | Display 12H time.

## Methods

| Name  | Description
| --- | ---
| [setTime](#method-setTime) | Set a time for single date picker.
| [setStartTime](#method-setStartTime) | Set start time of date range.
| [setEndTime](#method-setEndTime) | Set end time of date range.