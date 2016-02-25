# sush-plugin-id-trim

Trim heads and/or tails from id.

## Usage

```javascript
import SUSH from 'sush';
import idTrim from 'sush-plugin-id-trim';
import spreadSheet from 'sush-plugin-spreadsheet';
import analytics from 'sush-plugin-google-analytics';
import redirect from 'sush-plugin-redirect';

const sheetUrl = 'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

// If you access "http://shorten.url/#/example"
new SUSH().flow([
  // > id = '/example';
  idTrim({ head: 1 }),
  // > id = 'example';
  addList({
    list: { example: 'http://example.com' }
  }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

```javascript
import idTrim from 'sush-plugin-id-trim';

Promise.resolve({
  id: '1234567'
})
.then(idTrim({ head: 1, tail: 2 }))
.then((obj) => console.log(obj.id));
// > '2345'
```

## LICENSE

MIT (c) 3846masa
