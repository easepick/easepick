---
layout: default
nav: Basic hotel calendar
title: "Basic hotel calendar"
description: ""
parent: Examples
nav_order: 2
permalink: /examples/basic-hotel-calendar
---

# Basic hotel calendar
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
      const DateTime = easepick.DateTime;
      const bookedDates = [
          '[js.date.yyyy]-[js.date.mm]-02',
          ['[js.date.yyyy]-[js.date.mm]-06', '[js.date.yyyy]-[js.date.mm]-11'],
          '[js.date.yyyy]-[js.date.mm]-18',
          '[js.date.yyyy]-[js.date.mm]-19',
          '[js.date.yyyy]-[js.date.mm]-20',
          '[js.date.yyyy]-[js.date.mm]-25',
          '[js.date.yyyy]-[js.date.mm]-27',
      ].map(d => {
          if (d instanceof Array) {
            const start = new DateTime(d[0], 'YYYY-MM-DD');
            const end = new DateTime(d[1], 'YYYY-MM-DD');

            return [start, end];
          }

          return new DateTime(d, 'YYYY-MM-DD');
      });
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
          minDays: 2,
          inseparable: true,
          filter(date, picked) {
            if (picked.length === 1) {
              const incl = date.isBefore(picked[0]) ? '[)' : '(]';
              return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
            }

            return date.inArray(bookedDates, '[)');
          },
        }
      });
    </script>
  </body>
</html>
```