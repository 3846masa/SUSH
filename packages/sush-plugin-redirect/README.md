# sush-plugin-redirect

Redirect URL which is pair of id.

## Usage

```javascript
import SUSH from 'sush';
import addList from 'sush-plugin-add-object';
import redirect from 'sush-plugin-redirect';

// If you access "http://shorten.url/#example",
// you are redirected to "http://example.com"
new SUSH().flow([
  addList({
    list: { example: 'http://example.com' }
  }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## LICENSE

MIT (c) 3846masa
