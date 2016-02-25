/* global fetch */
import 'isomorphic-fetch';
import url from 'url';
import qs from 'querystring';

const parseSheetEntry = (entry) => {
  let obj = {};
  for (let key in entry) {
    if (!key.match(/^gsx\$/)) continue;
    let newKey = key.replace(/^gsx\$/, '');
    obj[newKey] = entry[key].$t;
  }
  return obj;
};

// http://stackoverflow.com/a/26885636
const gid2wid = (gid) => {
  let xorval = gid > 31578 ? 474 : 31578;
  let letter = gid > 31578 ? 'o' : '';
  return letter + parseInt((gid ^ xorval)).toString(36);
};

const fetchSheet = async (sheetUrl) => {
  const sheetId = sheetUrl.match(/\/(\w+_\w+)\//)[1];
  const sheetUrlHashQuery = qs.parse(url.parse(sheetUrl).hash.substr(1));
  const sheetKey = gid2wid(parseInt(sheetUrlHashQuery.gid, 10));

  const sheetDataUrl =
    `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheetKey}/public/values?alt=json`;
  const sheetDataRes = await fetch(sheetDataUrl);
  if (!sheetDataRes.ok) {
    throw new Error('Fetch failed.');
  }

  const entries = (await sheetDataRes.json()).feed.entry.map(parseSheetEntry);
  return entries;
};

async function checkIdAsync({ id, sheetUrl }) {
  const entries = await fetchSheet(sheetUrl);
  for (let entry of entries) {
    if (entry.id === id) return false;
  }
  return true;
}

export default checkIdAsync;
