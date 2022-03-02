---
layout: default
nav: lock-plugin
title: "@easepick/lock-plugin"
parent: Packages
description: ""
nav_order: 6
permalink: /packages/lock-plugin
---

# @easepick/lock-plugin
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Flock-plugin.svg)](https://www.npmjs.com/package/@easepick/lock-plugin)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

Adds the ability to disable days for selection.

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
    <script src="https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
          'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@[version.number]/dist/index.css',
        ],
        plugins: ['LockPlugin'],
        LockPlugin: {
          minDate: new Date(),
        },
      });
    </script>
  </body>
</html>
```

## Installation

#### NPM

```bash
npm install @easepick/core @easepick/lock-plugin
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/):

```ts
import { easepick } from '@easepick/core';
import { LockPlugin } from '@easepick/lock-plugin';

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@[version.number]/dist/index.css',
  ],
  plugins: [LockPlugin],
});
```

Another way to initialize `easypick`:

```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/lock-plugin@[version.number]/dist/index.css',
  ],
  plugins: ['LockPlugin'],
});
```

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| {{ 'minDate' | anchor_tag: 'option' }} | Date <br/> string <br/> number | null | The minimum/earliest date that can be selected. <br/> Date Object or Unix Timestamp (with milliseconds) or ISO String.
| {{ 'maxDate' | anchor_tag: 'option' }} | Date <br/> string <br/> number | null | The maximum/latest date that can be selected. <br/> Date Object or Unix Timestamp (with milliseconds) or ISO String.
| {{ 'minDays' | anchor_tag: 'option' }} | number | null | The minimum days of the selected range.
| {{ 'maxDays' | anchor_tag: 'option' }} | number | null | The maximum days of the selected range.
| {{ 'selectForward' | anchor_tag: 'option' }} | boolean | false | Select second date after the first selected date.
| {{ 'selectBackward' | anchor_tag: 'option' }} | boolean | false | Select second date before the first selected date.
| {{ 'presets' | anchor_tag: 'option' }} | boolean | true | Disable unallowed presets (when PresetPlugin is included).
| {{ 'inseparable' | anchor_tag: 'option' }} | boolean | false | Disable date range selection with locked days.
| {{ 'filter' | anchor_tag: 'option' }} | function | null | Lock days by custom function.