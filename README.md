# 🍣 SUSH 🍣 : Simple Url SHortener

![logo](img/sush_logo.png)

Simple Url SHortener

## What's that

This is a URL shortener working on browser.

When you access ``http://example.com/#/google``, SUSH gets shorten-ID from hash (``#/google``), and redirect URL.

Because of working on browser, you can provide URL shortener via Github-Pages or any HTTP server.

## Example

## Usage

```javascript
import SUSH from 'sush';
import idTrim from 'sush-plugin-id-trim';
import spreadSheet from 'sush-plugin-spreadsheet';
import analytics from 'sush-plugin-google-analytics';
import redirect from 'sush-plugin-redirect';

const sheetUrl = 'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

new SUSH().flow([
  idTrim({ head: 1 }),
  spreadSheet({ sheetUrl: sheetUrl }),
  analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## Plugins

- [sush](./packages/sush)
  - Core module
- [sush-plugin-id-trim](./packages/sush-plugin-id-trim)
  - Trim heads and/or tails from id
- [sush-plugin-redirect](./packages/sush-plugin-redirect)
  - Redirect URL which is pair of id
- [sush-plugin-spreadsheet](./packages/sush-plugin-spreadsheet)
  - Fetch Google SpreadSheet as URL list
- [sush-plugin-add-object](./packages/sush-plugin-add-object)
  - Add object to URL list
- [sush-plugin-google-analytics](./packages/sush-plugin-google-analytics)
  - Send Google Analytics data
- [sush-plugin-template](./packages/sush-plugin-template)
  - Template of plugins

## See more
- [README.ja.md](./README.ja.md)
  - Translate to English, please :tada:

## LICENSE

MIT (c) 3846masa
