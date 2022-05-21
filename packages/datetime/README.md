# @easepick/datetime

[![npm version](https://badge.fury.io/js/@easepick%2Fdatetime.svg)](https://www.npmjs.com/package/@easepick/datetime)

> This package does not need to be installed if you are using [@easepick/bundle](https://easepick.com/packages/bundle).

DateTime library for `easepick`.


## Documentation

[https://easepick.com/packages/datetime](https://easepick.com/packages/datetime)


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

| name | arguments | description
| --- | --- | ---
| getWeek | - | Returns a week number of date
| clone | - | Returns a copy of date
| toJSDate | - | Returns [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.
| inArray | (array, inclusivity) | Find DateTime object in passed DateTime array. 
| isBetween | (date1, date2, inclusivity) | Check if a DateTime is between two other DateTime.
| isBefore | (date, unit) | Check if a DateTime is before another DateTime. `unit` are `day`, `month`, `year`.
| isSameOrBefore | (date, unit) | Check if a DateTime is before or the same as another DateTime. `unit` are `day`, `month`.
| isAfter | (date, unit) | Check if a DateTime is after another DateTime.. `unit` are `day`, `month`, `year`.
| isSameOrAfter | (date, unit) | Check if a DateTime is after or the same as another DateTime. `unit` are `day`, `month`.
| isSame | (date, unit) | Check if a DateTime is the same as another DateTime. `unit` are `day`, `month`. 
| add | (duration, unit) | Mutates the original DateTime by adding unit. `unit` are `day`, `month`. 
| subtract | (duration, unit) | Mutates the original DateTime by subtracting unit. `unit` are `day`, `month`. 
| diff | (date, unit) | Returns diff between two DateTime. `unit` are `day`, `month`. 
| format | (format, lang) | Format output. See [tokens format](#tokens-format) for `format` argument. `lang` affects month names (`MMM`, `MMMM` tokens).


## Tokens format

_Tokens are case-sensitive._

| | Token | Output
| --- | :---: | ---
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
