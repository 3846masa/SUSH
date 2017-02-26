# sush-plugin-google-analytics

[![NPM](https://nodei.co/npm/sush-plugin-google-analytics.png?compact=true)](https://nodei.co/npm/sush-plugin-google-analytics/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/sush-plugin-google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/sush-plugin-google-analytics)

> Send url to Google Analytics.

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
<script src="https://unpkg.com/sush-plugin-google-analytics"></script>
<!-- Add script tags of SUSH Plugins -->
```

### Via Node.js
```
npm install --save sush sush-plugin-google-analytics [...SUSH_PLUGINS]
```

## Usage

### Via HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-google-analytics"></script>
  <script src="https://unpkg.com/sush-plugin-add-object"></script>
  <script src="https://unpkg.com/sush-plugin-redirect"></script>
  <script>
    var sush = new SUSH();

    sush.flow([
      SUSH.$addObject({ example: 'http://example.com' }),
      // Exec ga('send', 'pageview'); with URL hash string.
      SUSH.$googleAnalytics({ analyticsId: 'UA-XXXXXXXX-1' }),
      SUSH.$redirect({ fallback: './404.html' })
    ]);
  </script>
</head>
</html>
```

### Via Node.js (e.g. Browserify, Webpack)

```js
import SUSH from 'sush';
import googleAnalytics from 'sush-plugin-google-analytics';
import addObject from 'sush-plugin-add-object';
import redirect from 'sush-plugin-redirect';

const sush = new SUSH();

sush.flow([
  addObject({ example: 'http://example.com' }),
  // Exec ga('send', 'pageview'); with URL hash string.
  googleAnalytics({ analyticsId: 'UA-XXXXXXXX-1' }),
  redirect({ fallback: './404.html' })
]);
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
