---
layout: default
nav: Basic example
title: "Basic example"
description: ""
parent: Examples
nav_order: 1
permalink: /examples/basic
---

# Basic example
{: .no_toc }

### Demo

<input id="eg-basic" class="form-control demo-wrapper" data-cfg="egbasic" style="width: 250px;"/>

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
      });
    </script>
  </body>
</html>
```