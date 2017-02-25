# sush-plugin-add-object

[![NPM](https://nodei.co/npm/sush-plugin-add-object.png?compact=true)](https://nodei.co/npm/sush-plugin-add-object/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/sush-plugin-add-object.svg?style=flat-square)](https://www.npmjs.com/package/sush-plugin-add-object)

> Add object to URL list

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
<script src="https://unpkg.com/sush-plugin-add-object"></script>
<!-- Add script tags of SUSH Plugins -->
```

### Via Node.js
```
npm install --save sush sush-plugin-add-object [...SUSH_PLUGINS]
```

## Usage

### Via HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-add-object"></script>
  <script src="https://unpkg.com/sush-plugin-redirect"></script>
  <script>
    var sush = new SUSH();

    sush.flow([
      SUSH.$addObject({
        'hashstr': 'https://redirect.example'
      }),
      SUSH.$redirect()
    ]);
  </script>
</head>
</html>
```

### Via Node.js (e.g. Browserify, Webpack)

```js
import SUSH from 'sush';
import addObject from 'sush-plugin-add-object';
import redirect from 'sush-plugin-redirect';

sush.flow([
  addObject({
    'hashstr': 'https://redirect.example'
  }),
  redirect()
]);
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
