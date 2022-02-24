---
event: view
args: (event)
---

`event` is CustomEvent. 

Event is called after render elements.

```js
...
setup: (picker) => {
  picker.on('view', (event) => {
    const { date, view, index, target } = event.detail;
    // date is DateTime object
    // view is string (eg.: Header, Main, Footer, etc.)
    // index is number, indicate index of calendar, can be null
    // target is HTMLElement, can be null
    //
    // some action
  });
},
...
```