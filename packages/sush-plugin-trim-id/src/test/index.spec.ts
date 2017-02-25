import * as assert from 'power-assert';

import SUSH from 'sush';
import SUSHPluginTrimId from '../';

describe('SUSHPluginTrimId', () => {
  let sush: SUSH;

  beforeEach(() => {
    // Init SUSH
    sush = new SUSH();
    // Location mock
    (sush as any)._location = new URL('https://example.com/#/example');
  });

  it('dose not change id if params is none', (done) => {
    const expected = '/example';

    sush.flow([
      SUSHPluginTrimId(),
      ({ id: actual, stock }) => {
        assert.strictEqual(actual, expected);
        return { id: actual, stock };
      }
    ])
    .then(() => done())
    .catch((err) => done(err));
  });

  it('trims head of id if head param is avaliable', (done) => {
    const expected = 'ample';

    sush.flow([
      SUSHPluginTrimId({ head: 3 }),
      ({ id: actual, stock }) => {
        assert.strictEqual(actual, expected);
        return { id: actual, stock };
      }
    ])
    .then(() => done())
    .catch((err) => done(err));
  });

  it('trims tail of id if tail param is avaliable', (done) => {
    const expected = '/exam';

    sush.flow([
      SUSHPluginTrimId({ tail: 3 }),
      ({ id: actual, stock }) => {
        assert.strictEqual(actual, expected);
        return { id: actual, stock };
      }
    ])
    .then(() => done())
    .catch((err) => done(err));
  });
});
