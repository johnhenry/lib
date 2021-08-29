import { join } from "../string-center-pad@0.0.0/index.mjs";

const Link = class {
  constructor(head, tail = undefined) {
    if (tail !== undefined && !(tail instanceof Link)) {
      throw new Error("tail must be undefined or instance of Link");
    }
    this._head = head;
    this._tail = tail;
  }
  get head() {
    return this._head;
  }
  get tail() {
    return this._tail;
  }
  set tail(newTail) {
    if (newTail !== undefined && !(newTail instanceof Link)) {
      throw new Error("new tail must be undefined or instance of Link");
    }
    this._tail = newTail;
  }
  get length() {
    return [...this].length;
  }
  *[Symbol.iterator]() {
    yield this.head;
    if (this.tail) {
      yield* this.tail;
    }
  }
  join(joiner = " -> ", spacer = " ") {
    return join(this, joiner, spacer);
  }
  toString(...args) {
    return this.join(...args);
  }
  at(index = 0) {
    return index === 0 ? this : this._tail?.at(index - 1);
  }
  penultimate() {
    if (this.tail && !this.tail.tail) {
      return this;
    }
    return this.tail?.penultimate() || this;
  }
  last() {
    return this.tail?.last() || this;
  }
  decapitate() {
    const { tail } = this;
    this.tail = undefined;
    return [this, tail];
  }
};
export default Link;
