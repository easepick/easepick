---
event: select
args: (event)
---

`event` is CustomEvent. 

Event is called when selection is submitted.

```js
...
setup: (picker) => {
  picker.on('selected', (event) => {
    const { date } = event.detail;
    // date is DateTime object
    //
    // some action
  });
},
...
```