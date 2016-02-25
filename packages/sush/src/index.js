class SUSH {
  constructor() {

  }

  flow(tasks) {
    const hash = location.hash.substr(1);
    return tasks.reduce(
      (promise, task) => promise.then(task),
      Promise.resolve({ id: hash, list: {} })
    );
  }
}

export default SUSH;
