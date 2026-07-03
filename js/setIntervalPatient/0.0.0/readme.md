## setIntervalPatient

`setIntervalPatient` has a similar API to set the built-in `setIntervalPatient` function,
but it waits for the previous instance callback to be completed before
calling the next.

Additonally `clearIntervalPatient` returns true if the id exists,
and false if it does not.

```javascript
import setIntervalPatient, { clear as clearIntervalPatient } from "..";
const id = setIntervalPatient(() => {
  /* function that must finish  */
}, 100);
setTimeout(() => clearIntervalPatient(id), 2000);
```
