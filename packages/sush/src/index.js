import Stock from './Stock.js';

class SUSH {
  constructor({ mode = 'default' } = {}) {
    this.stock = new Stock({ mode: mode });
  }

  flow( tasks ) {
    const hash = location.hash.substr(1);
    return tasks.reduce(
      (promise, task) => promise.then(task),
      Promise.resolve({ id: hash, list: this.stock })
    );
  }
}

export default SUSH;
