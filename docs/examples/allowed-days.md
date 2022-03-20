---
layout: default
nav: Allowed days
title: "Allowed days"
description: ""
parent: Examples
nav_order: 5
permalink: /examples/allowed-days-instead-of-lock-days
---

# Allowed days
{: .no_toc }

### Demo

<input id="eg-allowed-days" class="form-control demo-wrapper" data-cfg="egalloweddays" style="width: 250px;"/>


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
        ],
        plugins: ['LockPlugin'],
        LockPlugin: {
          filter(date, picked) {
            // varible `allowedDates` is predefined array
            // in this example this array contains dates 1, 3, 7, 11, 17, 21 of current month
            // eg.: ['2022-03-01', '2022-03-03', '2022-03-07', etc ...]
            return !allowedDates.includes(date.format('YYYY-MM-DD'));
          },
        },
      });
    </script>
  </body>
</html>
```