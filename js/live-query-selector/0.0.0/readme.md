# Live Query Selector

Create a live array of elements matching the given selector within a given element.

## API

- selector: string -- selector
- element: HTMLElement -- in which to search for queries. Defaults to documetn's root node.
- useNodeList: boolean -- return a [MutableNodeList](https://johnhenry.github.io/lib/js/create-mutable-nodelist/0.0.0/index.html) instead of an Array.

The returned array/`MutableNodeList` has a non-enumerable `stop()` method
that disconnects the underlying `MutationObserver` — call it when you're
done watching, or the observer keeps running indefinitely.

## Usage

```javascript
import liveQuerySelector from "../../live-query-selector/0.0.0/index.mjs";
const targetElement = document.body;
const list = liveQuerySelector("div", targetElement);
// ...later, when you no longer need live updates:
list.stop();
```
