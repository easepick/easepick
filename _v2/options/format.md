---
type: String
default: YYYY-MM-DD
---

The default output format.

Allowed formats:

|  | Token | Output |
|-------|--------|---------|
| Day of Month | D | 1 2 ... 30 31 |
|  | DD | 01 02 ... 30 31 |
| Month | M | 1 2 ... 11 12 |
|  | MM | 01 02 ... 11 12 |
|  | MMM | Jan Feb ... Nov Dec |
|  | MMMM | January February ... November December |
| Year | YY | 70 71 ... 29 30 |
|  | YYYY | 1970 1971 ... 2029 2030 |

You may escape formatting tokens using \\.

Eg.:

```js
format: 'YYYY-MM-DD\T00:00:00'
```

Result: **2020-01-01T00:00:00**