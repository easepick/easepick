---
layout: default
nav: Customize
title: "Customize"
description: ""
parent: Examples
nav_order: 6
permalink: /examples/customize
---

# Customize
{: .no_toc }

### Demo

<input id="eg-customize" class="form-control demo-wrapper" data-cfg="egcustomize" style="width: 250px;"/>

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
          'https://easepick.com/assets/css/customize_sample.css',
        ],
      });
    </script>
  </body>
</html>
```