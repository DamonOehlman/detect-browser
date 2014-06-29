/**
  # detect-browser

  This is a package that attempts to detect a browser vendor and version (in
  a semver compatible format) using a navigator useragent in a browser or
  `process.version` in node.

  ## Example Usage

  <<< examples/simple.js

**/

exports.name = 'node';
exports.version = process.version.slice(1);
