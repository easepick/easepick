# @easepick/amp-plugin

[![npm version](https://badge.fury.io/js/@easepick%2Famp-plugin.svg)](https://www.npmjs.com/package/@easepick/amp-plugin)

> This package does not need to be installed if you are using [@easepick/bundle](https://easepick.com/packages/bundle).

Adds extra options.

## Documentation

[https://easepick.com/packages/amp-plugin](https://easepick.com/packages/amp-plugin)


## Options:

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| dropdown | object | { minYear: 1950, maxYear: null, months: false, years: false } | Enable dropdowns for months, years. If `maxYear` is `null` then `maxYear` will be equal to `(new Date()).getFullYear()`. <br/> `years` can be equal to `asc` string to change the sort direction.
| resetButton | boolean <br/> function | false | Adds a reset button to clear the current selection. It is allowed to pass a custom function that must return `true` to clear the selection.
| darkMode | boolean | true | Allows dark mode to be used if the user's system settings are set to dark mode.
| weekNumbers | boolean | false | Show week numbers.
| locale | object | { resetButton: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>' } | Texts for Amp plugin options.
