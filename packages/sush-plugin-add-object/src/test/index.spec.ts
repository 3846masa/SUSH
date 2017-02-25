import * as assert from 'power-assert';

import SUSH from 'sush';
import SUSHPluginAddObject from '../';

describe('SUSHPluginAddObject', () => {
  let sush: SUSH;

  beforeEach(() => {
    // Init SUSH
    sush = new SUSH();
  });

  it('adds urls in Object', (done) => {
    const expectedObj: {[key: string]: string} = {
      example: 'https://example.com',
      test: 'https://test.example'
    };

    sush.flow([
      SUSHPluginAddObject(expectedObj)
    ])
    .then(() => {
      for (const key of Object.keys(expectedObj)) {
        const expected = expectedObj[key];
        assert.strictEqual(sush.stock.get(key), expected);
      }
      done();
    })
    .catch((err) => done(err));
  });

  it('adds urls in Map', (done) => {
    const basedObj: {[key: string]: string} = {
      example: 'https://example.com',
      test: 'https://test.example'
    };

    const expectedMap = new Map();
    for (const key of Object.keys(basedObj)) {
      expectedMap.set(key, basedObj[key]);
    }

    sush.flow([
      SUSHPluginAddObject(expectedMap)
    ])
    .then(() => {
      for (const [key, expected] of expectedMap.entries()) {
        assert.strictEqual(sush.stock.get(key), expected);
      }
      done();
    })
    .catch((err) => done(err));
  });
});
