---
event: show
args: (event)
---

`event` is CustomEvent. 

Event is called after show.

```js
...
setup: (picker) => {
  picker.on('show', (event) => {
    const { target } = event.detail;
    // target is HTMLElement
    //
    // some action
  });
},
...
```