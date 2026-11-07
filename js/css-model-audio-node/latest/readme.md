# CSS Model Audio Node

Connect an auto Source to a CSS Model

```javascript
import CssModelAudio from "./index.mjs";

const stream = await navigator.mediaDevices.getUserMedia({
  video: false,
  audio: true,
});
const context = new AudioContext();
context.createMediaStreamSource(stream).connect(new CssModelAudio(context));
```

```css
.volume::before {
  content: "volume" var(--audio-volume) "frequency" var(--audio-f-0)
    "time domain" var(--audio-td-0);
}
```
