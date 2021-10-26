export default (templated) => `<!DOCTYPE html><html lang="en"><head><title>John Henry</title><link rel="canonical" href="https://johnhenry.github.io/"><meta name="description" content="John Henry's Person Portfolio and Blog"><meta name="robots" content="index,follow"><meta name="theme-color" content="#343233"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="utf-8"><meta name="keywords" content="fun,math,engineering,science,experiments,programming"><meta name="author" content="John Henry"><script>
      globalThis.addEventListener('load', () => {
        globalThis.navigator.serviceWorker.register("/service-worker.js");
      });
    </script><link rel="manifest" href="https://johnhenry.github.io/manifest.json"><link rel="icon" href="https://johnhenry.github.io/image/iajh.png" type="image/png"><link rel="stylesheet" href="https://johnhenry.github.io/lib/vendor/css/reset/2.0.0/index.css"><link rel="stylesheet" href="https://johnhenry.github.io/lib/css/universal-unstyled-links/0.0.0/index.css"><link rel="stylesheet" href="https://johnhenry.github.io/lib/css/universal-box-sizing/0.0.0/index.css"><link rel="stylesheet" href="https://johnhenry.github.io/lib/css/universal-no-margins/0.0.0/index.css"><link rel="stylesheet" href="https://johnhenry.github.io/lib/css/hide-n-show/0.0.0/landscape.css"><link rel="stylesheet" href="https://johnhenry.github.io/style/index.css"><script type="module" src="https://johnhenry.github.io/lib/js/css-variables-mouse/0.0.0/index.mjs"></script><script type="module" src="https://johnhenry.github.io/lib/js/css-variables-scroll/0.0.0/index.mjs"></script><link rel="apple-touch-icon" sizes="512x512" href="https://johnhenry.github.io/image/iajh.512.png"><link rel="apple-touch-icon" sizes="384x384" href="https://johnhenry.github.io/image/iajh.384.png"><link rel="apple-touch-icon" sizes="256x256" href="https://johnhenry.github.io/image/iajh.256.png"><link rel="apple-touch-icon" sizes="192x192" href="https://johnhenry.github.io/image/iajh.192.png"><link rel="apple-touch-icon" sizes="128x128" href="https://johnhenry.github.io/image/iajh.128.png"></head><body>
<script type="module">
  import localStorageCycler from "https://johnhenry.github.io/lib/js/localstorage-cycler/0.0.0/index.mjs";
  const key = 'color-theme-preference';
  const values = ["","color-theme-dark","color-theme-light"];
  const target = globalThis.document.querySelector("body");
  const emit = ({value, key, index}) => {
    target.classList.remove(...values.filter(s=>s));
    if(value){
      target.classList.add(value);
    }
  }
  window["cycleTheme"] = localStorageCycler(key, emit, ...values);
</script>
<script type="module">
  import localStorageCycler from "https://johnhenry.github.io/lib/js/localstorage-cycler/0.0.0/index.mjs";
  const key = 'mouse-chaser-preference';
  const values = ["mouse-chaser-logo","mouse-chaser-coordinates",""];
  const target = globalThis.document.querySelector("body");
  const emit = ({value, key, index}) => {
    target.classList.remove(...values.filter(s=>s));
    if(value){
      target.classList.add(value);
    }
  }
  window["cycleMouseChaser"] = localStorageCycler(key, emit, ...values);
</script><header><a href="/#"><img src="https://johnhenry.github.io/image/iajh.png" width="32" height="32" alt="logo"><p class="hide-n-show-landscape-inline">John Henry </p></a><nav class="hide show-landscape-flex"><a href="/blog">Blog</a><a href="/#me">Me</a><a href="/#projects">Projects</a></nav></header>${ templated }<span class="mouse-chaser"></span><footer><a href="#">© 2021 John Henry</a><nav><a href="#" class="mouse-chaser-toggler" onclick="event.preventDefault(),window.cycleMouseChaser()" title="Click to toggle mouse."></a><a href="#" class="color-theme-toggler" onclick="event.preventDefault(),window.cycleTheme()" title="Click to toggle color theme."></a></nav></footer></body></html>`;