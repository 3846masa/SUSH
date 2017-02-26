import * as assert from 'power-assert';
const xhrMock = require('xhr-mock');

import SUSH from 'sush';
import SUSHPluginSpreadsheet from '../';

describe('SUSHPluginRedirect', () => {
  let sush: SUSH;
  let origSend: any;

  beforeEach(() => {
    // Init SUSH
    sush = new SUSH();
    // Stubs
    origSend = XMLHttpRequest.prototype.send;
    xhrMock.setup();
  });

  it('throws Error when sheetUrl is invalid URL', (done) => {
    sush.flow([
      SUSHPluginSpreadsheet({ sheetUrl: 'https://example.com' })
    ])
    .catch((err: Error) => {
      assert.equal(err.message, 'sheetUrl is invalid.');
      done();
    })
    .catch((err) => done(err));
  });

  it('throws Error when gid is none', (done) => {
    const sheetUrl =
      'https://docs.google.com/spreadsheets/d/_cB257f4f64d4EaBcAcFdBA6b6A46dbc3ae5Ac5AEb2dD/view';

    sush.flow([
      SUSHPluginSpreadsheet({ sheetUrl })
    ])
    .catch((err: Error) => {
      assert.equal(err.message, 'sheetUrl must contain gid.');
      done();
    })
    .catch((err) => done(err));
  });

  it('sets data from Google Spreadsheet', (done) => {
    const sheetUrl =
      `https://docs.google.com/spreadsheets/d/_cB257f4f64d4EaBcAcFdBA6b6A46dbc3ae5Ac5AEb2dD/view#gid=0`;

    // Server mock
    const responseData = require('./response.json');
    xhrMock.mock((_req, res) => {
      return res.status(200).body(JSON.stringify(responseData));
    });

    sush.flow([
      SUSHPluginSpreadsheet({ sheetUrl })
    ])
    .then(() => {
      assert.strictEqual(sush.stock.get('example'), 'https://example.com');
      assert.strictEqual(sush.stock.get('google'), 'https://google.com');
      done();
    })
    .catch((err) => done(err));
  });

  it('throws Error when XHRHttpRequest receives non-200', (done) => {
    const sheetUrl =
      `https://docs.google.com/spreadsheets/d/_cB257f4f64d4EaBcAcFdBA6b6A46dbc3ae5Ac5AEb2dD/view#gid=0`;

    xhrMock.mock((req, res) => {
      req._xhr.statusText = 'Not Found';
      return res.status(404);
    });

    sush.flow([
      SUSHPluginSpreadsheet({ sheetUrl })
    ])
    .catch((err: Error) => {
      assert.equal(err.message, '404: Not Found');
      done();
    })
    .catch((err) => done(err));
  });

  it('throws Error when XHRHttpRequest causes Error', (done) => {
    const sheetUrl =
      `https://docs.google.com/spreadsheets/d/_cB257f4f64d4EaBcAcFdBA6b6A46dbc3ae5Ac5AEb2dD/view#gid=0`;

    // Stubs
    xhrMock.teardown();
    XMLHttpRequest.prototype.send = function () {
      const self = (this as XMLHttpRequest);
      const ev = document.createEvent('Event');
      ev.initEvent('error', false, false);
      (ev as any).error = new Error('Error');
      self.dispatchEvent(ev);
    };

    sush.flow([
      SUSHPluginSpreadsheet({ sheetUrl })
    ])
    .catch((err: Error) => {
      assert.equal(err.message, 'Error');
      done();
    })
    .catch((err) => done(err));
  });

  afterEach(() => {
    // Reset stubs
    xhrMock.teardown();
    XMLHttpRequest.prototype.send = origSend;
  });
});
