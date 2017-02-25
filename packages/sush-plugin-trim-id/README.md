# sush-plugin-trim-id

[![NPM](https://nodei.co/npm/sush-plugin-trim-id.png?compact=true)](https://nodei.co/npm/sush-plugin-trim-id/)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/sush-plugin-trim-id.svg?style=flat-square)](https://www.npmjs.com/package/sush-plugin-trim-id)

> Trim head or tail from ID

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
<script src="https://unpkg.com/sush-plugin-trim-id"></script>
<!-- Add script tags of SUSH Plugins -->
```

### Via Node.js
```
npm install --save sush sush-plugin-trim-id [...SUSH_PLUGINS]
```

## Usage

### Via HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/sush"></script>
  <script src="https://unpkg.com/sush-plugin-trim-id"></script>
  <script>
    console.log(location.hash); // `#/example.view`

    var sush = new SUSH();

    sush.flow([
      ({ id, store }) => {
        console.log(id); // `/example.view`
        return { id, store };
      },
      SUSH.$trimId({ head: 1, tail: 5 })
    ])
    .then(({ id, store }) => {
      console.log(id); // `example`
    })
    .catch((err) => {
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

console.log(location.hash); // `#/example.view``

const sush = new SUSH();

sush.flow([
  ({ id, store }) => {
    console.log(id); // `/example.view`
    return { id, store };
  },
  trimId({ head: 1, tail: 5 })
])
.then(({ id, store }) => {
  console.log(id); // `example`
})
.catch((err) => {
  console.error(err.stack || err);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
