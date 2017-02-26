# sush-plugin-redirect

[![NPM](https://nodei.co/npm/sush-plugin-redirect.png?compact=true)](https://nodei.co/npm/sush-plugin-redirect/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/sush-plugin-redirect.svg?style=flat-square)](https://www.npmjs.com/package/sush-plugin-redirect)

> Redirect to URL associated with id.

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
<script src="https://unpkg.com/sush-plugin-redirect"></script>
<!-- Add script tags of SUSH Plugins -->
```

### Via Node.js
```
npm install --save sush sush-plugin-redirect [...SUSH_PLUGINS]
```

## Usage

### Via HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-redirect"></script>
  <script>
    var sush = new SUSH();

    sush.flow([
      SUSH.$redirect({ fallback: './404.html' })
    ])
    .catch((err) => {
      // Throw error if not found and not set fallback
      console.error(err.stack || err);
    });
  </script>
</head>
</html>
```

### Via Node.js (e.g. Browserify, Webpack)

```js
import SUSH from 'sush';
import redirect from 'sush-plugin-redirect';

const sush = new SUSH();

sush.flow([
  redirect({ fallback: './404.html' })
])
.catch((err) => {
  // Throw error if not found and not set fallback
  console.error(err.stack || err);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
