---
layout: default
nav: core
title: "@easepick/core"
parent: Packages
description: ""
nav_order: 4
permalink: /packages/core
---

# @easepick/core
{: .no_toc }

![](https://img.shields.io/badge/npm-[version.number]-blue)

Main package of easepick.

## Quick example
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
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

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).

#### NPM

```bash
npm install @easepick/core
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.umd.min.js"></script>
```

## Usage

If you’re using a bundler, e.g. [webpack](https://webpack.js.org/), you’ll need to import easepick.

```ts
import { easepick } from '@easepick/core';
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

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| [element](#element) | HTMLElement <br/> string | null | Bind the datepicker to a element. Also is possible to bind to any element (not input) for example you need inline calendar.
| [doc](#doc) | Document <br/> ShadowRoot | document | 
| [css](#css) | string <br/> array <br/> function | []
| [firstDay](#firstDay) | number | 1 | Day of start week. (0 - Sunday, 1 - Monday, 2 - Tuesday, etc…)
| [lang](#lang) | string | en-US | Language. <br/>This option affect to day names, month names via [Date.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) and also affect to plural rules via [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules).
| [date](#date) | Date <br/> string <br/> number | null | Preselect date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| [format](#format) | string | YYYY-MM-DD | The default output format. <br/> See [tokens format](#tokens-format).
| [grid](#grid) | number | 1 | Number of calendar columns.
| [calendars](#calendars) | number | 1 | Number of visible months.
| [readonly](#readonly) | boolean | true | Add `readonly` attribute to `element`.
| [autoApply](#autoApply) | boolean | true | Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.
| [header](#header) | boolean <br/> string <br/> HTMLElement | false | Add header to calendar.
| [locale](#locale) | object | { <br/>nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>', <br/> previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>', <br/> cancel: 'Cancel', <br/>apply: 'Apply'<br/>} | Icon and text for buttons. 
| [documentClick](#documentClick) | boolean <br/> function | function | Hide picker on click outside picker element.
| [setup](#setup) | function | null | 
| [plugins](#plugins) | array | [] | List of plugins.

## Methods

in progress
{: .fs-6 .fw-300 }

## Events

in progress
{: .fs-6 .fw-300 }

### Tokens format

_Tokens are case-sensitive._

| | Token | Output
| --- | :---: |
| Day of Month | D |	1 2 … 30 31 
| | DD | 01 02 … 30 31
| Month |	M |	1 2 … 11 12
| | MM | 01 02 … 11 12
| | MMM | Jan Feb … Nov Dec
| | MMMM | January February … November December
| Year | YY | 70 71 … 29 30
| | YYYY | 1970 1971 … 2029 2030