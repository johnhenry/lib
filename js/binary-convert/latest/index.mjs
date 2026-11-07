const arrayBufferToArray = (ab) => {
  const array = [];
  for (let i = 0; i < ab.byteLength; ++i) {
    array[i] = view[i];
  }
  return array;
};

const arrayToBuffer = (arr) => {
  const buf = Buffer.alloc(arr.length);
  for (let i = 0; i < arr.length; ++i) {
    buf[i] = arr[i];
  }
  return buf;
};

export const arrayBufferToBuffer = (ab) => {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};

////////////////////////////////////////////////////////////////////////////////

const bufferToArray = (buf) => {
  const ab = new ArrayBuffer(buf.length);
  const view = [];
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return view;
};

const arrayToArrayBuffer = (arr) => {
  const ab = new ArrayBuffer(arr.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < arr.length; ++i) {
    view[i] = arr[i];
  }
  return ab;
};

export const bufferToArrayBuffer = (buf) => {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
};

const froms = {
  arraybuffer: arrayBufferToArray,
  buffer: bufferToArray,
};
const tos = {
  arraybuffer: arrayToArrayBuffer,
  buffer: arrayToBuffer,
};

export default (from = "", to = "") =>
  (item) => {
    const funcFrom = froms[from.toLowerCase()];
    const funcTo = tos[to.toLowerCase()];
    const a = funcFrom(item);
    const b = funcTo(a);
    return b;
  };
