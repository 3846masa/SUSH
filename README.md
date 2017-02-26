# SUSH | Simple URL Shortener

![SUSH](./img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](http://img.shields.io/travis/3846masa/SUSH/develop.svg?style=flat-square)](https://travis-ci.org/3846masa/SUSH)
[![codecov](https://img.shields.io/codecov/c/github/3846masa/SUSH/develop.svg?style=flat-square)](https://codecov.io/gh/3846masa/SUSH)

> 🍣 Simple URL Shortener which can be provided from a static HTML server.

This is the URL shortener which can be provided from a static HTML server.

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
      SUSH.$trimId({ head: 1 }),
      SUSH.$spreadsheet({ sheetUrl: sheetUrl }),
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
  spreadsheet({ sheetUrl: sheetUrl }),
  analytics({ analyticsId: 'UA-XXXXXXXX-1' }),
  redirect({ fallback: '/404.html' })
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
  - Redirect to URL associated with id
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
