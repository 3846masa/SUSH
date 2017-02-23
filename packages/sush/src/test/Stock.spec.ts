import * as assert from 'power-assert';

import Stock from '../Stock';

describe('Stock', () => {
  describe('#_convertKey', () => {
    let stock: Stock;

    it('returns unchanged string if mode is \'default\'', () => {
      const expected = 'SOMEthing';

      const key = 'SOMEthing';
      stock = new Stock();
      const actual = (stock as any)._convertKey(key);

      assert.strictEqual(actual, expected);
    });

    it('returns upper-case if mode is \'upper\'', () => {
      const expected = 'UPPERCASE';

      const key = 'uppercase';
      stock = new Stock({ mode: 'upper' });
      const actual = (stock as any)._convertKey(key);

      assert.strictEqual(actual, expected);
    });

    it('returns lower-case if mode is \'lower\'', () => {
      const expected = 'lowercase';

      const key = 'LOWERCASE';
      stock = new Stock({ mode: 'lower' });
      const actual = (stock as any)._convertKey(key);

      assert.strictEqual(actual, expected);
    });
  });

  describe('#set', () => {
    let stock: Stock;

    beforeEach(() => {
      stock = new Stock();
    });

    it('sets the value for the key', () => {
      const actual = stock.set('somekey', 'value');
      assert.ok(actual);
    });
  });

  describe('#get', () => {
    let stock: Stock;

    beforeEach(() => {
      stock = new Stock();
      stock.set('somekey', 'value');
    });

    it('returns the value associated to the key', () => {
      const expected = 'value';
      const actual = stock.get('somekey');
      assert.strictEqual(actual, expected);
    });

    it('returns empty string if there is none', () => {
      const expected = '';
      const actual = stock.get('nonekey');
      assert.strictEqual(actual, expected);
    });
  });

  describe('#has', () => {
    let stock: Stock;

    beforeEach(() => {
      stock = new Stock();
      stock.set('somekey', 'value');
    });

    it('returns true if value has been associated to key', () => {
      const actual = stock.has('somekey');
      assert.strictEqual(actual, true);
    });

    it('returns false if value has NOT been associated to key', () => {
      const actual = stock.has('nonekey');
      assert.strictEqual(actual, false);
    });
  });
});
