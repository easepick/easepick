---
layout: default
nav: range-plugin
title: "@easepick/range-plugin"
parent: Packages
description: ""
nav_order: 8
permalink: /packages/range-plugin
---

# @easepick/range-plugin
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Frange-plugin.svg)](https://www.npmjs.com/package/@easepick/range-plugin)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

Adds the ability to select a range of dates.

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
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
          'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.css',
        ],
        plugins: ['RangePlugin'],
        RangePlugin: {
          tooltip: true,
        },
      });
    </script>
  </body>
</html>
```

## Installation

#### NPM

```bash
npm install @easepick/core @easepick/range-plugin
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/base-plugin@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/):

```ts
import { easepick } from '@easepick/core';
import { RangePlugin } from '@easepick/range-plugin';

const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.css',
  ],
  plugins: [RangePlugin],
});
```

Another way to initialize `easypick`:

```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
    'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@[version.number]/dist/index.css',
  ],
  plugins: ['RangePlugin'],
});
```

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| {{ 'elementEnd' | anchor_tag: 'option' }} | HTMLElement <br/> string | null | Bind the datepicker to a element for end date.
| {{ 'startDate' | anchor_tag: 'option' }} | Date <br/> string <br/> number  | null | Preselect start date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| {{ 'endDate' | anchor_tag: 'option' }} | Date <br/> string <br/> number  | null | Preselect end date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| {{ 'repick' | anchor_tag: 'option' }} | boolean | false | If date range is already selected, then user can change only one of start date or end date (depends on clicked field) instead of new date range.
| {{ 'strict' | anchor_tag: 'option' }} | boolean | true | Disabling the option allows you to select an incomplete range.
| {{ 'delimiter' | anchor_tag: 'option' }} | string | ' - ' | Delimiter between dates.
| {{ 'tooltip' | anchor_tag: 'option' }} | boolean | true | Showing tooltip with how much days will be selected.
| {{ 'tooltipNumber' | anchor_tag: 'option' }} | function |  | Handling the tooltip number.
| {{ 'locale' | anchor_tag: 'option' }} | object | { one: 'day', other: 'days' } | Text for the tooltip. <br/> Keys depends on option lang (see [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules)).

## Methods

| Name  | Description
| --- | ---
| {{ 'setStartDate' | anchor_tag: 'option' }} |  
| {{ 'setEndDate' | anchor_tag: 'option' }} |  
| {{ 'getStartDate' | anchor_tag: 'option' }} |  
| {{ 'getEndDate' | anchor_tag: 'option' }} |  