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

[![npm version](https://badge.fury.io/js/@easepick%2Fcore.svg)](https://www.npmjs.com/package/@easepick/core)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

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
          'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
        ],
      });
    </script>
  </body>
</html>
```

## Installation

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
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
  ],
});
```

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| {{ 'element' | anchor_tag: 'option' }} | HTMLElement <br/> string | null | Bind the datepicker to a element. Also is possible to bind to any element (not input) for example you need inline calendar.
| {{ 'doc' | anchor_tag: 'option' }} | Document <br/> ShadowRoot | document | 
| {{ 'css' | anchor_tag: 'option' }} | string <br/> array <br/> function | []
| {{ 'firstDay' | anchor_tag: 'option' }} | number | 1 | Day of start week. (0 - Sunday, 1 - Monday, 2 - Tuesday, etc…)
| {{ 'lang' | anchor_tag: 'option' }} | string | en-US | Language. <br/>This option affect to day names, month names via [Date.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) and also affect to plural rules via [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules).
| {{ 'date' | anchor_tag: 'option' }} | Date <br/> string <br/> number | null | Preselect date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| {{ 'format' | anchor_tag: 'option' }} | string | YYYY-MM-DD | The default output format. <br/> See [tokens format](/packages/datetime#tokens-format).
| {{ 'grid' | anchor_tag: 'option' }} | number | 1 | Number of calendar columns.
| {{ 'calendars' | anchor_tag: 'option' }} | number | 1 | Number of visible months.
| {{ 'readonly' | anchor_tag: 'option' }} | boolean | true | Add `readonly` attribute to `element`.
| {{ 'autoApply' | anchor_tag: 'option' }} | boolean | true | Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.
| {{ 'zIndex' | anchor_tag: 'option' }} | number | null | zIndex of picker.
| {{ 'inline' | anchor_tag: 'option' }} | boolean | false | Show calendar inline.
| {{ 'header' | anchor_tag: 'option' }} | boolean <br/> string <br/> HTMLElement | false | Add header to calendar.
| {{ 'locale' | anchor_tag: 'option' }}| object | { <br/>nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>', <br/> previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>', <br/> cancel: 'Cancel', <br/>apply: 'Apply'<br/>} | Icon and text for buttons. 
| {{ 'documentClick' | anchor_tag: 'option' }} | boolean <br/> function | function | Hide picker on click outside picker element.
| {{ 'setup' | anchor_tag: 'option' }} | function | null | 
| {{ 'plugins' | anchor_tag: 'option' }} | array | [] | List of plugins.

## Methods

| Name  | Description
| --- | ---
| {{ 'version' | anchor_tag: 'method' }} | return version of picker.
| {{ 'isShown()' | anchor_tag: 'method' }} | Determine if the picker is visible or not.
| {{ 'show()' | anchor_tag: 'method' }} | Show the picker.
| {{ 'hide()' | anchor_tag: 'method' }} | Hide the picker.
| {{ 'setDate(date)' | anchor_tag: 'method' }} | Set date programmatically.
| {{ 'getDate()' | anchor_tag: 'method' }} | Get selected date.
| {{ 'on(type, listener, options)' | anchor_tag: 'method' }} | Add listener to container element.
| {{ 'off(type, listener, options)' | anchor_tag: 'method' }} | Remove listener from container element.
| {{ 'trigger(type, detail)' | anchor_tag: 'method' }} | Dispatch an event.


#### Example
```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
  ],
});
// 
picker.setDate('2022-01-01');
```

## Events

Events based on [CustomEvent()](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent).

| Name  | Description
| --- | ---
| {{ 'render' | anchor_tag: 'event' }} | 
| {{ 'view' | anchor_tag: 'event' }} | 
| {{ 'preselect' | anchor_tag: 'event' }} | 
| {{ 'select' | anchor_tag: 'event' }} | 

It is also allowed to use default events such as `click`, `keydown`, etc.

#### Example
```js
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
  ],
  setup(picker) {
    picker.on('view', (e) => {
      const { view, date, target } = e.detail;
      // do something
    });
  },
});
```
