import CssModelAudio from "./index.mjs";

const stream = await navigator.mediaDevices.getUserMedia({
  video: false,
  audio: true,
});
const context = new AudioContext();
context
  .createMediaStreamSource(stream)
  .connect(
    new CssModelAudio(
      context,
      { fftSize: 256 },
      { colorOrder: [] },
      undefined,
      "mic"
    )
  );
