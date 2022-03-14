---
layout: default
nav: Using another language
title: "Using another language"
description: ""
parent: Examples
nav_order: 4
permalink: /examples/using-another-language
---

# Using another language
{: .no_toc }

### Demo

<input id="eg-lang" class="form-control demo-wrapper" data-cfg="eglang" style="width: 250px;"/>

### Quick example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>easepick</title>
    <script src="https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.0-beta.5/dist/index.umd.min.js"></script>
  </head>
  <body>
    <input id="datepicker"/>
    <script>
      const picker = new easepick.create({
        element: document.getElementById('datepicker'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.0-beta.5/dist/index.css',
        ],
        lang: 'sv-SE',
        plugins: ['RangePlugin'],
        RangePlugin: {
          locale: {
            one: 'dag',
            other: 'dagar',
          },
        },
      });
    </script>
  </body>
</html>
```