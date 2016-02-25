function SUSHIdTrim({ head = 0, tail = 0 }) {
  return async function ({ id, list }) {
    let newId = (tail != 0) ? id.slice(head, -1 * tail) : id.slice(head);
    return { id: newId, list: list };
  };
}

export default SUSHIdTrim;
