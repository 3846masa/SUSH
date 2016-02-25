function SUSHAddObject({ list : addList = {} }) {
  return async function ({ id, list }) {
    return { id: id, list: Object.assign(list, addList) };
  };
}

export default SUSHAddObject;
