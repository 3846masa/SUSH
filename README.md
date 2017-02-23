# SUSH | Simple Url SHortener

![SUSH](./img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> 🍣 Simple Url SHortener working on browser

This is a URL shortener working on browser.

When you access ``http://example.com/#/google``, SUSH gets shorten-ID from hash (``/google``), and redirect URL.

You can provide URL shortener via GitHub Pages or any HTTP server, because it is able to work on browser.

## Table of Contents
<!-- TOC depthFrom:2 depthTo:2 updateOnSave:false -->

- [Install](#install)
- [Usage](#usage)
- [Plugins](#plugins)
- [Contribute](#contribute)
- [License](#license)

<!-- /TOC -->

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

## Plugins

**[WIP]**

- [sush](./packages/sush)
  - Core module for SUSH
- [sush-plugin-trim-id](./packages/sush-plugin-trim-id)
  - Trim head or tail from ID
- [sush-plugin-redirect](./packages/sush-plugin-redirect)
  - Redirect URL which is pair of ID
- [sush-plugin-spreadsheet](./packages/sush-plugin-spreadsheet)
  - Fetch Google SpreadSheet as URL list
- [sush-plugin-add-object](./packages/sush-plugin-add-object)
  - Add object to URL list
- [sush-plugin-google-analytics](./packages/sush-plugin-google-analytics)
  - Send Google Analytics data
- [sush-plugin-template](./packages/sush-plugin-template)
  - Template of plugins

## Contribute

PRs accepted.

## License

MIT © 3846masa
