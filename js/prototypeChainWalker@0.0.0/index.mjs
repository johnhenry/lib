export default function* (object, mapper = (_) => _) {
  let index = 0;
  do {
    yield mapper(object, index);
    object = Object.getPrototypeOf(object);
  } while (object);
}
