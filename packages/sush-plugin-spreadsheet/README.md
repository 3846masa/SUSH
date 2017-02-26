# sush-plugin-spreadsheet

[![NPM](https://nodei.co/npm/sush-plugin-spreadsheet.png?compact=true)](https://nodei.co/npm/sush-plugin-spreadsheet/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/sush-plugin-spreadsheet.svg?style=flat-square)](https://www.npmjs.com/package/sush-plugin-spreadsheet)

> Fetch Google Spreadsheet.

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
<script src="https://unpkg.com/sush-plugin-spreadsheet"></script>
<!-- Add script tags of SUSH Plugins -->
```

### Via Node.js
```
npm install --save sush sush-plugin-spreadsheet [...SUSH_PLUGINS]
```

## Usage

### Prepare

1. Create Google Spreadsheet
  - First line is header which has `id`, `url`, (optional `timestamp`)
  - See [Example](https://docs.google.com/spreadsheets/d/1RyoXWAqO4MQykn2NHNvBKgmofikO_1r9ErE4KUc0TCA/edit?usp=sharing)
2. Publish Spreadsheet to the Web
  - See [Google Help](https://support.google.com/docs/answer/37579?ref_topic=2818999)
3. Set spreadsheet URL to `sheetUrl`
  - URL **must contain gid in hash or query**

### Via HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-spreadsheet"></script>
  <script src="https://unpkg.com/sush-plugin-redirect"></script>
  <script>
    var sheetUrl =
      'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

    var sush = new SUSH();

    sush.flow([
      SUSH.$spreadsheet({ sheetUrl })
      SUSH.$redirect({ fallback: './404.html' })
    ])
    .catch((err) => {
      // Throw error if not found
      console.error(err.stack || err);
    });
  </script>
</head>
</html>
```

### Via Node.js (e.g. Browserify, Webpack)

```js
import SUSH from 'sush';
import spreadsheet from 'sush-plugin-spreadsheet';
import redirect from 'sush-plugin-redirect';

const sheetUrl =
    'https://docs.google.com/spreadsheets/d/XXXXXX_XXXXXX/edit#gid=0';

const sush = new SUSH();

sush.flow([
  spreadsheet({ sheetUrl })
  redirect({ fallback: './404.html' })
])
.catch((err) => {
  // Throw error if not found
  console.error(err.stack || err);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
