import initiateHTTP, { FetchEvent } from "./mod.ts";
initiateHTTP(8080);
addEventListener("fetch", (event: Event): void => {
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(
    new Response("hidey how?", {
      status: 200,
    })
  );
});
