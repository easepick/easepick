# @easepick/range-plugin

[![npm version](https://badge.fury.io/js/@easepick%2Frange-plugin.svg)](https://www.npmjs.com/package/@easepick/range-plugin)

> This package does not need to be installed if you are using [@easepick/bundle](https://easepick.com/packages/bundle).

Adds the ability to select a range of dates.


## Documentation

[https://easepick.com/packages/range-plugin](https://easepick.com/packages/range-plugin)


## Options

| Name | Type | Default | Description
| --- | :---: | :---: | ---
| elementEnd | HTMLElement <br/> string | null | Bind the datepicker to a element for end date.
| startDate | Date <br/> string <br/> number  | null | Preselect start date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| endDate | Date <br/> string <br/> number  | null | Preselect end date. <br/> Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| repick | boolean | false | If date range is already selected, then user can change only one of start date or end date (depends on clicked field) instead of new date range.
| strict | boolean | true | Disabling the option allows you to select an incomplete range.
| delimiter | string | ' - ' | Delimiter between dates.
| tooltip | boolean | true | Showing tooltip with how much days will be selected.
| tooltipNumber | function |  | Handling the tooltip number.
| locale | object | { one: 'day', other: 'days' } | Text for the tooltip. <br/> Keys depends on option lang (see [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules)).


## Methods

| Name  | Description
| --- | ---
| setDateRange(start, end) | Set date range. Should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| setStartDate(date) | Set start of date range. Should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| setEndDate(date) |  Set end of date range. Should be Date Object or Unix Timestamp (with milliseconds) or String (must be equal to option format).
| getStartDate() | Return current start of date range as [DateTime](https://easepick.com/packages/datetime) Object.
| getEndDate() |  Return current end of date range as [DateTime](https://easepick.com/packages/datetime) Object.
