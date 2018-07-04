# detect-browser

This is a package that attempts to detect a browser vendor and version (in
a semver compatible format) using a navigator useragent in a browser or
`process.version` in node.

[![NPM](https://nodei.co/npm/detect-browser.png)](https://nodei.co/npm/detect-browser/)

[![stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/dominictarr/stability#stable) [![Build Status](https://api.travis-ci.org/DamonOehlman/detect-browser.svg?branch=master)](https://travis-ci.org/DamonOehlman/detect-browser) [![Maintainability](https://api.codeclimate.com/v1/badges/84947fce3f3b06da69d0/maintainability)](https://codeclimate.com/github/DamonOehlman/detect-browser/maintainability)

## NOTE: Migrating from 1.x to 2.x or higher

Release 2.0 introduced a breaking API change (hence the major release)
which requires invocation of a `detect` function rather than just inclusion of
the module. PR [#46](https://github.com/DamonOehlman/detect-browser/pull/46)
provides more context as to why this change has been made.

## Example Usage

```js
const { detect } = require('detect-browser');
const browser = detect();

// handle the case where we don't detect the browser
if (browser) {
  console.log(browser.name);
  console.log(browser.version);
  console.log(browser.os);
}
```

[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=DamonOehlman/a96b45bc4614b23671eac8721b781deb)

[![Try detect-browser on RunKit](https://badge.runkitcdn.com/detect-browser.svg)](https://runkit.com/damonoehlman/detect-browser-node-example)

Or you can use a switch statement:

```js
const { detect } = require('detect-browser');
const browser = detect();

// handle the case where we don't detect the browser
switch (browser && browser.name) {
  case 'chrome':
  case 'firefox':
    console.log('supported');
    break;

  case 'edge':
    console.log('kinda ok');
    break;

  default:
    console.log('not supported');
}
```

## Adding additional browser support

The current list of browsers that can be detected by `detect-browser` is
not exhaustive. If you have a browser that you would like to add support for
then please submit a pull request with the implementation.

Creating an acceptable implementation requires two things:

1. A test demonstrating that the regular expression you have defined identifies
your new browser correctly. Examples of this can be found in the
`test/logic.js` file.


2)  Write the actual regex to the `index.js` file. In most cases adding
    the regex to the list of existing regexes will be suitable (if usage of `detect-brower`
    returns `undefined` for instance), but in some cases you might have to add it before
    an existing regex. This would be true for a case where you have a browser that
    is a specialised variant of an existing browser but is identified as the
    non-specialised case.

When writing the regular expression remember that you would write it containing a
single [capturing group](https://regexone.com/lesson/capturing_groups) which
captures the version number of the browser.

## LICENSE

The MIT License (MIT)

Copyright (c) 2018 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


