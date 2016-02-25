# sush-plugin-add-object

Add object to redirect URL list.

## Usage

```javascript
import SUSH from 'sush';
import addList from 'sush-plugin-add-object';
import redirect from 'sush-plugin-redirect';

new SUSH().flow([
  addList({
    list: {
      example: 'http://example.com', // http://shorten.url/#example
      google: 'http://google.com' // http://shorten.url/#google
    }
  }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

```javascript
import addList from 'sush-plugin-add-object';

Promise.resolve({
  list: {
    example: 'http://example.com/#foo',
    twitter: 'http://twitter.com'
  }
})
.then(addList({
  list: {
    example: 'http://example.com/#bar',
    google: 'http://google.com'
  }
}))
.then((obj) => console.log(obj.list));
/*
{
  example: 'http://example.com/#bar',
  google: 'http://google.com',
  twitter: 'http://twitter.com'
}
*/
```

## LICENSE

MIT (c) 3846masa
