# Event Consumer

> **This module now also lives at [`@johnhenry/domkit`](https://github.com/johnhenry/domkit)** (`@johnhenry/domkit/event-consumer.component`), where active development continues. This copy is a frozen, working snapshot -- it stays published at this URL (per this repo's own no-deletion policy) but won't receive future fixes.


A `display:contents` wrapper element for declaratively wiring event
listeners onto its children/self, without writing JavaScript setup code.
Listens for the `events` attribute's comma-delimited event names and runs
`onevent`'s function body (like inline `onclick`, but for an arbitrary
event list) on each. Stops propagation unless a `bubbles` attribute is
present.

No `global.mjs` yet — register the tag name yourself:

```javascript
import EventConsumer from "../../event-consumer.component/0.0.0/index.mjs";
customElements.define("event-consumer", EventConsumer);
```

## Usage

```html
<event-consumer events="click,keydown" onevent="console.log(event.type)">
  <button>Click or focus+key me</button>
</event-consumer>
```
