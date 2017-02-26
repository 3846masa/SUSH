import * as assert from 'power-assert';
import * as td from 'testdouble';

import SUSH from 'sush';
import SUSHPluginRedirect from '../';

describe('SUSHPluginRedirect', () => {
  let sush: SUSH;
  let locationStub: Location;
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
    locationStub = new URL('https://example.com/#example') as any;
    (sush as any)._location = locationStub;
    (SUSHPluginRedirect as any)._location = locationStub;

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
    const expected = new URL('https://redirect.example').href;

    sush.flow([
      SUSHPluginRedirect({ fallback: expected })
    ])
    .then(() => {
      td.verify(document.head.appendChild(metaStub(`0;URL=${expected}`)));
      assert.strictEqual(locationStub.href, expected);
      done();
    })
    .catch((err) => done(err));
  });

  it('redirects to matched URL', (done) => {
    const expected = new URL('https://redirect.example').href;

    sush.stock.set('example', expected);

    sush.flow([
      SUSHPluginRedirect()
    ])
    .then(() => {
      td.verify(document.head.appendChild(metaStub(`0;URL=${expected}`)));
      assert.strictEqual(locationStub.href, expected);
      done();
    })
    .catch((err) => done(err));
  });

  afterEach(() => {
    // Reset stubs
    td.reset();
  });
});
