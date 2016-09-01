var semver = require('semver');
var browser = require('../');
var test = require('tape');

test('can run detection', function(t) {
  t.ok(browser, require.cache[require.resolve('../')]);
  t.end();
});

test('name detected', function(t) {
  t.ok(browser.name, browser.name);
  t.end();
});

test('version detected', function(t) {
  t.ok(browser.version, browser.version);
  t.end();
});

test('version is semver compatible', function(t) {
  t.ok(semver.valid(browser.version));
  t.end();
});
