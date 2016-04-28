class Stock extends Map {
  constructor ({ mode = 'default' } = {}) {
    super();
    this.mode = mode;
  }

  get ( key ) {
    return super.get(this._convertKey( key ));
  }

  set ( key, value ) {
    return super.set(this._convertKey( key ), value);
  }

  has ( key ) {
    return super.has(this._convertKey( key ));
  }

  _convertKey ( key ) {
    if (this.mode === 'upper') {
      return key.toUpperCase();
    } else if (this.mode === 'lower') {
      return key.toLowerCase();
    } else {
      return key;
    }
  }
}

export default Stock;
