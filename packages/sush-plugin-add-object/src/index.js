function SUSHAddObject({ list : addList = {} }) {
  return async function ({ id, list }) {
    Object.keys(addList).forEach(( key ) => {
      list.set(key, addList[ key ]);
    });
    return { id: id, list: list };
  };
}

export default SUSHAddObject;
