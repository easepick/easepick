---
layout: default
nav: Basic hotel calendar
title: "Basic hotel calendar"
description: ""
parent: Examples
nav_order: 2
permalink: /examples/basic-hotel-calendar
---

# Basic example
{: .no_toc }

### Demo

<input id="eg-hotel-cal" class="form-control demo-wrapper" data-cfg="eghotelcal" style="width: 250px;"/>

### Quick example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.css',
          'https://easepick.com/assets/css/demo_hotelcal.css',
        ],
        plugins: ['RangePlugin', 'LockPlugin'],
        RangePlugin: {
          tooltipNumber(num) {
            return num - 1;
          },
          locale: {
            one: 'night',
            other: 'nights',
          },
        },
        LockPlugin: {
          minDate: new Date(),
          inseparable: true,
          filter(date, picked) {
            // varible `bookedDates` is predefined array
            // in this example this array contains dates 2, 6-11, 18, 19, 20, 25, 27 of current month
            // eg.: ['2022-03-02', ['2022-03-06', '2022-03-11'], '2022-03-18', etc ...]
            if (picked.length === 1) {
              const incl = date.isBefore(picked[0]) ? '[)' : '(]';
              return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
            }

            return date.inArray(bookedDates, '[)');
          },
      });
    </script>
  </body>
</html>
```