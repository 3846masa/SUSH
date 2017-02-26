import * as assert from 'power-assert';

import Util from '../Util';

describe('Util', () => {
  describe('.parseSheetEntry', () => {
    it('parses entires', () => {
      const data = require('./entries.json');
      const expected = [
        {
          timestamp: '1990/01/01 0:00:00',
          id: 'example',
          url: 'https://example.com'
        },
        {
          timestamp: '1990/01/01 0:00:00',
          id: 'google',
          url: 'https://google.com'
        }
      ];
      const actual = data.map(Util.parseSheetEntry);

      assert.deepEqual(actual, expected);
    });
  });

  describe('.convertGidToWid', () => {
    it('returns wid when gid > 31578', () => {
      const expected = 'ocq';
      const actual = Util.convertGidToWid('16');
      assert.strictEqual(actual, expected);
    });
    it('returns wid when gid <= 31578', () => {
      const expected = 'oowy6v0';
      const actual = Util.convertGidToWid('1506531046');
      assert.strictEqual(actual, expected);
    });
  });
});
