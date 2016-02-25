# sush

SUSH core module.

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

## LICENSE

MIT (c) 3846masa
