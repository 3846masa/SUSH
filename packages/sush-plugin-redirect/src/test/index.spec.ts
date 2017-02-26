import * as assert from 'power-assert';
import * as td from 'testdouble';

import SUSH from 'sush';
import SUSHPluginRedirect from '../';

describe('SUSHPluginRedirect', () => {
  let sush: SUSH;
  let metaStub: (...args: any[]) => HTMLMetaElement;

  before(() => {
    metaStub = (td.matchers as any).create({
      matches(matcherArgs: string[], actual: HTMLMetaElement) {
        const expected = matcherArgs[0];
        return actual.getAttribute('content') === expected;
      }
    });
  });

  beforeEach(() => {
    // Init SUSH
    sush = new SUSH();
    // Location mock
    (sush as any)._location = new URL('https://example.com/#example');

    // Stubs
    td.replace(document.head, 'appendChild');
  });

  it('throws error if not match and not set fallback', (done) => {
    sush.flow([
      SUSHPluginRedirect()
    ])
    .catch((err: Error) => {
      assert.ok(err.message.match(/not found/));
      done();
    })
    .catch((err) => done(err));
  });

  it('redirects to fallback if not match', (done) => {
    const expected = '0;URL=https://redirect.example';

    sush.flow([
      SUSHPluginRedirect({ fallback: 'https://redirect.example' })
    ])
    .then(() => {
      td.verify(document.head.appendChild(metaStub(expected)));
      done();
    })
    .catch((err) => done(err));
  });

  it('redirects to matched URL', (done) => {
    const expected = '0;URL=https://redirect.example';

    sush.stock.set('example', 'https://redirect.example');

    sush.flow([
      SUSHPluginRedirect()
    ])
    .then(() => {
      td.verify(document.head.appendChild(metaStub(expected)));
      done();
    })
    .catch((err) => done(err));
  });

  afterEach(() => {
    // Reset stubs
    td.reset();
  });
});
