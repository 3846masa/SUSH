# sush-plugin-spreadsheet

Fetch Google SpreadSheet as URL list.

## Usage

```javascript
import SUSH from 'sush';
import spreadSheet from 'sush-plugin-spreadsheet';
import redirect from 'sush-plugin-redirect';

// URL must contain sheetId (XXXXXX_XXXXXX) and gid (#gid=YYY)
const sheetUrl = 'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=YYY';

new SUSH().flow([
  spreadSheet({ sheetUrl: sheetUrl }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## LICENSE

MIT (c) 3846masa
