---
layout: default
nav: datetime
title: "@easepick/datetime"
parent: Packages
description: ""
nav_order: 3
permalink: /packages/datetime
---

# @easepick/datetime
{: .no_toc }

[![npm version](https://badge.fury.io/js/@easepick%2Fdatetime.svg)](https://www.npmjs.com/package/@easepick/datetime)
{: .image-link }

> You don't need to install this package if you are using [@easepick/bundle](/packages/bundle).
{: .inform }

DateTime library for `easepick`.

## Quick example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/datetime@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <div id="date-el"></div>
    <script>
      const DateTime = easepick.DateTime;
      const today = new DateTime();
      const tomorrow = today.clone().add(1, 'day');

      const dateEl = document.getElementById('date-el');
      dateEl.innerHTML = `
        Today is: ${today.format('DD MMM YYYY')}
        <br/>
        Tomorrow is: ${tomorrow.format('DD MMM YYYY')}
      `;
    </script>
  </body>
</html>
```

## DateTime() constructor

Creates a JavaScript DateTime instance that represents a single moment in time.  
Using: `new DateTime(date, format, lang)`

| argument | type | default value | description
| --- | :---: | :---: | ---
| date | Date <br/> string <br/> number | null | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or date string or number (unix timestamp).
| format | string | 'YYYY-MM-DD' | Required when you provide `date` argument as string. Must match a string value for proper parsing.
| lang | string | 'en-US' | Affects month names (`MMM`, `MMMM` tokens).

You can omit all arguments and call `new DateTime()`. This will create a DateTime object represents the current date.

## Methods

| name | arguments | 
| --- | :---: | ---
| [getWeek](#method-getWeek) | - | Returns a week number of date
| [clone](#method-clone) | - | Returns a copy of date
| [toJSDate](#method-toJSDate) | - | Returns [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.
| [inArray](#method-inArray) | (array, inclusivity) | Find DateTime object in passed DateTime array. 
| [isBetween](#method-isBetween) | (date1, date2, inclusivity) | Check if a DateTime is between two other DateTime.
| [isBefore](#method-isBefore) | (date, unit) | Check if a DateTime is before another DateTime. `unit` are `day`, `month`, `year`.
| [isSameOrBefore](#method-isSameOrBefore) | (date, unit) | Check if a DateTime is before or the same as another DateTime. `unit` are `day`, `month`.
| [isAfter](#method-isAfter) | (date, unit) | Check if a DateTime is after another DateTime.. `unit` are `day`, `month`, `year`.
| [isSameOrAfter](#method-isSameOrAfter) | (date, unit) | Check if a DateTime is after or the same as another DateTime. `unit` are `day`, `month`.
| [isSame](#method-isSame) | (date, unit) | Check if a DateTime is the same as another DateTime. `unit` are `day`, `month`. 
| [add](#method-add) | (duration, unit) | Mutates the original DateTime by adding unit. `unit` are `day`, `month`. 
| [subtract](#method-subtract) | (duration, unit) | Mutates the original DateTime by subtracting unit. `unit` are `day`, `month`. 
| [diff](#method-diff) | (date, unit) | Returns diff between two DateTime. `unit` are `day`, `month`. 
| [format](#method-format) | (format, lang) | Format output. See [tokens format](#tokens-format) for `format` argument. `lang` affects month names (`MMM`, `MMMM` tokens).

## Tokens format

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
| Hours (24 hour time) | H | 0 1 … 22 23
| | HH | 01 02 … 22 23
| Minutes | m | 1 2 … 58 59
| | mm | 01 02 … 58 59
| Seconds | s | 1 2 … 58 59
| | ss | 01 02 … 58 59