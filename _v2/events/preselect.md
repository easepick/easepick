---
event: preselect
args: (event)
---

`event` is CustomEvent. 

Event is called on select days (before submit selection).

```js
...
setup: (picker) => {
  picker.on('preselect', (date) => {
    const { date } = event.detail;
    // date is DateTime object
    //
    // some action
  });
},
...
```