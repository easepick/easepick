# @easepick/core

[![npm version](https://badge.fury.io/js/@easepick%2Fcore.svg)](https://www.npmjs.com/package/@easepick/core)

> This package does not need to be installed if you are using [@easepick/bundle](https://easepick.com/packages/bundle).

Main package of easepick.

## Documentation

[https://easepick.com/packages/core](https://easepick.com/packages/core)

## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| element | HTMLElement <br/> string | null | Bind the datepicker to a element. Also is possible to bind to any element (not input) for example you need inline calendar.
| doc | Document <br/> ShadowRoot | document | May be required if you need to pass ShadowRoot.
| css | string <br/> array <br/> function | [] | Pass a CSS file for picker. Don't mix types, if you are using css link then array should only contain links.
| firstDay | number | 1 | Day of start week. (0 - Sunday, 1 - Monday, 2 - Tuesday, etc…)
| lang | string | en-US | Language. <br/>This option affect to day names, month names via [Date.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) and also affect to plural rules via [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules).
| date | Date <br/> string <br/> number | null | Preselect date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| format | string | YYYY-MM-DD | The default output format. <br/> See [tokens format](https://easepick.com/packages/datetime#tokens-format).
| grid | number | 1 | Number of calendar columns.
| calendars | number | 1 | Number of visible months.
| readonly | boolean | true | Add `readonly` attribute to `element`.
| autoApply | boolean | true | Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.
| zIndex | number | null | zIndex of picker.
| inline | boolean | false | Show calendar inline.
| scrollToDate | boolean | true | Scroll to the selected date on open.
| header | boolean <br/> string <br/> HTMLElement | false | Add header to calendar.
| locale| object | { <br/>nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>', <br/> previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>', <br/> cancel: 'Cancel', <br/>apply: 'Apply'<br/>} | Icon and text for buttons. 
| documentClick | boolean <br/> function | function | Hide picker on click outside picker element.
| setup | function | null | 
| plugins | array | [] | List of plugins.

## Methods

| Name  | Description
| --- | ---
| version | return version of picker.
| isShown() | Determine if the picker is visible or not.
| show() | Show the picker.
| hide() | Hide the picker.
| clear() | Clear the picker selection.
| gotoDate(date) | Change visible month.
| setDate(date) | Set date programmatically.
| getDate() | Get selected date.
| on(type, listener, options) | Add listener to container element.
| off(type, listener, options) | Remove listener from container element.
| trigger(type, detail) | Dispatch an event.
| renderAll() | Redraw the calendar layout.
| destroy() | Destroy the picker.


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
| render | 
| view | 
| preselect | Event is called on select days (before submit selection). When `autoApply` option is `false`.
| select | Event is called when selection is submitted.

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

## PluginManager

`PluginManager` allows you to manage plugins of created picker.


#### Methods

| Name | Description
| --- | ---
| [getInstance(pluginName)](#pluginManager-getInstance) | Returns the plugin instance. `pluginName` is a string (eg.: `RangePlugin`).
| [addInstance(pluginName)](#pluginManager-addInstance) | Adds a plugin to the picker. Returns an instance of the added plugin.
| [removeInstance(pluginName)](#pluginManager-removeInstance) | Removes the plugin from the picker.Returns a boolean result.
| [reloadInstance(pluginName)](#pluginManager-reloadInstance) | Removes the plugin from the picker and adds it again. Returns an instance of the added plugin.

#### Example

```js
// example use bundle version
const picker = new easepick.create({
  element: document.getElementById('datepicker'),
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@[version.number]/dist/index.css',
  ],
});

// add AmpPlugin to the picker
const ampPlugin = picker.PluginManager.addInstance('AmpPlugin');
// change plugin option
ampPlugin.options.resetButton = true;
```
