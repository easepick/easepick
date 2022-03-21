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
      const allowedDates = [
          '[js.date.yyyy]-[js.date.mm]-01',
          '[js.date.yyyy]-[js.date.mm]-03',
          '[js.date.yyyy]-[js.date.mm]-07',
          '[js.date.yyyy]-[js.date.mm]-11',
          '[js.date.yyyy]-[js.date.mm]-17',
          '[js.date.yyyy]-[js.date.mm]-21',
      ]
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@[version.number]/dist/index.css',
        ],
        plugins: ['LockPlugin'],
        LockPlugin: {
          filter(date, picked) {
            return !allowedDates.includes(date.format('YYYY-MM-DD'));
          },
        },
      });
    </script>
  </body>
</html>
```