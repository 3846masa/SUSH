import { SUSHInfo } from 'sush';
import * as qs from 'querystring';

import Util from './Util';

const sheetIdRegExp = new RegExp('/spreadsheets/d/([a-zA-Z0-9_-]+)/');

/**
 * `SUSHPluginSpreadsheet` fetches Google Spreadsheet.
 */
function SUSHPluginSpreadsheet (
  { sheetUrl }: { sheetUrl: string }
) {
  return ({ id, stock }: SUSHInfo) => {
    const promise: Promise<SUSHInfo> = new Promise((resolve, reject) => {
      const sheetUrlObj = new URL(sheetUrl);

      // Parse URL
      const sheetId = (sheetUrl.match(sheetIdRegExp) || [])[1];
      if (!sheetId) {
        throw new Error('sheetUrl is invalid.');
      }
      // Get gid from hash
      const hashQuery = Object.assign(
        qs.parse(sheetUrlObj.hash.substr(1)),
        qs.parse(sheetUrlObj.search.substr(1))
      );
      if (!('gid' in hashQuery)) {
        throw new Error('sheetUrl must contain gid.');
      }
      // Convert gid to wid
      const sheetKey = Util.convertGidToWid(hashQuery.gid);

      const sheetDataUrl =
        `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheetKey}/public/values?alt=json`;

      // Fetch Google Spreadsheet
      const xhr = new XMLHttpRequest();
      xhr.open('GET', sheetDataUrl, true);
      xhr.addEventListener('load', () => resolve(xhr));
      xhr.addEventListener('error', (ev) => reject(ev.error));
      xhr.send();
    })
    .then((xhr: XMLHttpRequest) => {
      if (xhr.status !== 200) {
        throw new Error(`${xhr.status}: ${xhr.statusText}`);
      }

      const res = JSON.parse(xhr.responseText);
      const entries = (res.feed.entry as any[]).map(Util.parseSheetEntry);
      // tslint:disable no-string-literal
      entries.sort((a, b) => new Date(b['timestamp']).getTime() - new Date(a['timestamp']).getTime());
      entries.forEach((entry) => {
        stock.set(entry['id'], entry['url']);
      });
      // tslint:enable no-string-literal

      return { id, stock } as SUSHInfo;
    });

    return promise;
  };
};

export default SUSHPluginSpreadsheet;
