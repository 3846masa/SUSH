import * as assert from 'power-assert';
import * as td from 'testdouble';

import SUSH from 'sush';
import SUSHPluginGoogleAnalytics from '../';

describe('SUSHPluginGoogleAnalytics', () => {
  let sush: SUSH;
  let ga: any;

  beforeEach(() => {
    // Init SUSH
    sush = new SUSH();

    // Location mock
    (SUSHPluginGoogleAnalytics as any)._location = new URL('https://example.com/#example');

    // ga Stubs
    (window as any).ga = ga = td.function();
    td.when(ga('send'), { ignoreExtraArgs: true })
      .thenDo((_method, _argv, opts: any) => {
        if (opts.hitCallback) {
          opts.hitCallback();
        }
      });

    // appendChild Stubs
    td.replace(document.head, 'appendChild');
  });

  it('does nothing when analyticsId is none', (done) => {
    sush.flow([
      SUSHPluginGoogleAnalytics()
    ])
    .then(() => {
      // never calls ga
      td.verify(ga(), { times: 0, ignoreExtraArgs: true });
      done();
    })
    .catch((err) => done(err));
  });

  it('throws Error when hitCallback is not called', (done) => {
    // noop
    (window as any).ga = () => undefined;

    sush.flow([
      SUSHPluginGoogleAnalytics({
        analyticsId: 'U-XXXXXXXX-1',
        timeout: 500
      })
    ])
    .catch((err: Error) => {
      assert.strictEqual(err.message, 'Timeout.');
      done();
    })
    .catch((err) => done(err));
  });

  it('sends analyticsId via ga', (done) => {
    const captor = td.matchers.captor();

    const expectedId = 'U-XXXXXXXX-1';
    const expectedPath = '/#example';

    sush.flow([
      SUSHPluginGoogleAnalytics({
        analyticsId: expectedId
      })
    ])
    .then(() => {
      td.verify(ga('create', captor.capture()), { ignoreExtraArgs: true });
      td.verify(ga('send', 'pageview', captor.capture()));
      assert.strictEqual(captor.values[0], expectedId);
      assert.strictEqual(captor.values[1].page, expectedPath);
      done();
    })
    .catch((err) => done(err));
  });

  it('creates ga when ga is none', (done) => {
    delete (window as any).ga;

    const expectedId = 'U-XXXXXXXX-1';
    const expectedPath = '/#example';

    sush.flow([
      SUSHPluginGoogleAnalytics({
        analyticsId: expectedId,
        timeout: 0
      })
    ])
    .catch(() => Promise.resolve())
    .then(() => {
      const ga = (window as any).ga;
      assert.strictEqual(ga.q[0][1], expectedId);
      assert.strictEqual(ga.q[1][2].page, expectedPath);
      done();
    })
    .catch((err) => done(err));
  });

  afterEach(() => {
    // Reset stubs
    td.reset();
  });
});
