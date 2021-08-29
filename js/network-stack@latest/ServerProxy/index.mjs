export default class {
  constructor(stream) {
    this.stream = stream;
  }
  fetch(request) {
    placeRequest(this.stream, request);
    return new Response(this.stream);
  }
}
