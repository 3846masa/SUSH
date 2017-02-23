import * as assert from 'power-assert';

import SUSH, { SUSHInfo } from '../';

describe('SUSH', () => {
  describe('.constructor', () => {
    it('passes mode to Store', () => {
      const expected = 'upper';
      const sush = new SUSH({ mode: expected });
      const actual = sush.stock.mode;
      assert.strictEqual(actual, expected);
    });

    it('passes \'default\' as mode to Store if mode is none', () => {
      const expected = 'default';
      const sush = new SUSH();
      const actual = sush.stock.mode;
      assert.strictEqual(actual, expected);
    });
  });

  describe('#flow', () => {
    let sush: SUSH;

    beforeEach(() => {
      sush = new SUSH();
    });

    it('executes functions in array', (done) => {
      sush.flow([
        (info: SUSHInfo) => {
          assert.ok(info);
          return info;
        }
      ])
      .then(() => done())
      .catch((err) => done(err));
    });
  });
});
