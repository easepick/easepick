---
layout: default
nav: Show nights in tooltip
title: "Show nights in tooltip"
description: ""
parent: Examples
nav_order: 3
permalink: /examples/show-nights-in-tooltip
---

# Show nights in tooltip
{: .no_toc }

### Demo

<input id="eg-tooltip-nights" class="form-control demo-wrapper" data-cfg="egtooltipnights" style="width: 250px;"/>

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
        plugins: ['RangePlugin'],
        RangePlugin: {
          tooltipNumber(num) {
            return num - 1;
          },
          locale: {
            one: 'night',
            other: 'nights',
          },
        },
      });
    </script>
  </body>
</html>
```