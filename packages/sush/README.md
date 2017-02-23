# sush

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Core module for SUSH

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

### For HTML

Insert script tags in your HTML.
```html
<script src="https://unpkg.com/sush"></script>
<!-- Add script tags of SUSH Plugins -->
```

### Via Node.js
```
npm install --save sush [...SUSH_PLUGINS]
```

## Usage

### Via HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-trim-id"></script>
  <script src="https://unpkg.com/sush-plugin-google-analytics"></script>
  <script src="https://unpkg.com/sush-plugin-redirect"></script>
  <script>
    var sheetUrl =
      'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

    var sush = new SUSH();
    sush.flow([
      trimId({ head: 1 }),
      spreadSheet({ sheetUrl: sheetUrl }),
      analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
      redirect({ errorRedirect: '/404.html' })
    ]).catch((err) => {
      console.error(err.stack || err);
    });
  </script>
</head>
</html>
```

### Via Node.js (e.g. Browserify, Webpack)

```js
import SUSH from 'sush';
import trimId from 'sush-plugin-trim-id';
import spreadSheet from 'sush-plugin-spreadsheet';
import analytics from 'sush-plugin-google-analytics';
import redirect from 'sush-plugin-redirect';

const sheetUrl =
  'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

const sush = new SUSH();
sush.flow([
  trimId({ head: 1 }),
  spreadSheet({ sheetUrl: sheetUrl }),
  analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
  redirect({ errorRedirect: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa