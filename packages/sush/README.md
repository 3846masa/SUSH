# sush

[![NPM](https://nodei.co/npm/sush.png?compact=true)](https://nodei.co/npm/sush/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/sush.svg?style=flat-square)](https://www.npmjs.com/package/sush)

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
      SUSH.$trimId({ head: 1 }),
      SUSH.$spreadSheet({ sheetUrl: sheetUrl }),
      SUSH.$analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
      SUSH.$redirect({ fallback: '/404.html' })
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
  redirect({ fallback: '/404.html' })
]).catch((err) => {
  console.error(err.stack || err);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
