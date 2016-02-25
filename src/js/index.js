import 'babel-polyfill';
import SUSH from 'sush';
import idTrim from 'sush-plugin-id-trim';
import addList from 'sush-plugin-add-object';
import spreadSheet from 'sush-plugin-spreadsheet';
import analytics from 'sush-plugin-google-analytics';
import redirect from 'sush-plugin-redirect';
import siteConfig from '../../config/site.config.json';

const sheetUrl =
  'https://docs.google.com/spreadsheets/d/1RyoXWAqO4MQykn2NHNvBKgmofikO_1r9ErE4KUc0TCA/edit#gid=799771202';

new SUSH().flow([
  idTrim({ head: 1 }),
  spreadSheet({ sheetUrl: sheetUrl }),
  addList({ list: { '': './register.html' }}),
  analytics({ analyticsId: siteConfig.analyticsId }),
  redirect({ errorRedirect: './404/' })
]).catch((err) => {
  console.error(err.stack || err);
});
