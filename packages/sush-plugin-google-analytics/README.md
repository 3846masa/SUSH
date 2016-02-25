# sush-plugin-google-analytics

Send Google Analytics data.

## Usage

```javascript
import SUSH from 'sush';
import addList from 'sush-plugin-add-object';
import analytics from 'sush-plugin-google-analytics';
import redirect from 'sush-plugin-redirect';

new SUSH().flow([
  addList({
    list: { example: 'http://example.com' }
  }),
  // Exec ga('send', 'pageview'); with URL hash string.
  analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## LICENSE

MIT (c) 3846masa
