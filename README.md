# SUSH | Simple URL Shortener

[![Greenkeeper badge](https://badges.greenkeeper.io/3846masa/SUSH.svg)](https://greenkeeper.io/)

![SUSH](./img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://img.shields.io/travis/3846masa/SUSH/develop.svg?style=flat-square)](https://travis-ci.org/3846masa/SUSH)
[![codecov](https://img.shields.io/codecov/c/github/3846masa/SUSH/develop.svg?style=flat-square)](https://codecov.io/gh/3846masa/SUSH)

> 🍣 Simple URL Shortener which can be provided from a static HTML server.

This is the URL shortener which can be provided from a static HTML server.

When you access ``http://your.domain/#/example``, SUSH gets ID from hash (``/example``), and redirect to URL associated with ID.

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
  <meta charset="utf-8">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting...</p>

  <!-- SUSH scripts -->
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-trim-id"></script>
  <script src="https://unpkg.com/sush-plugin-spreadsheet"></script>
  <script src="https://unpkg.com/sush-plugin-google-analytics"></script>
  <script src="https://unpkg.com/sush-plugin-redirect"></script>

  <!-- main script -->
  <script>
    var sheetUrl =
      'https://docs.google.com/spreadsheets/d/XXXXXXX/edit#gid=XXX';

    var sush = new SUSH({ mode: 'lower' });

    sush.flow([
      SUSH.$trimId({ head: 1 }),
      SUSH.$spreadsheet({ sheetUrl: sheetUrl }),
      SUSH.$googleAnalytics({ analyticsId: 'UA-XXXXXXXX-1' }),
      SUSH.$redirect({ fallback: '/404/' })
    ])
    .catch((err) => {
      console.error(err);
    });
  </script>
</body>
</html>
```

### Via Node.js (e.g. Browserify, Webpack)

```js
import SUSH from 'sush';
import trimId from 'sush-plugin-trim-id';
import spreadsheet from 'sush-plugin-spreadsheet';
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
  - Send pageview to Google Analytics
- [sush-plugin-template](#)
  - **[WIP]** Template of plugins

## Contribute

PRs accepted.

## License

MIT © 3846masa
