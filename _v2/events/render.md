---
event: render
args: "(event)"
---

`event` is CustomEvent. 

Event is called before render element.

```js
...
setup: (picker) => {
  picker.on('render', (event) => {
    const { view, date } = event.detail;
    // view is string (eg.: Header, Main, Footer, etc.)
    // date is DateTime object
    //
    // some action
  });
},
...
```