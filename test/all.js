var test = require('tape');
var semver = require('semver');
var browser;

test('can run detection', function(t) {
  t.plan(1);
  t.ok(browser = require('../'));
});

test('name detected', function(t) {
  t.plan(1);
  t.ok(browser.name, browser.name);
});

test('version detected', function(t) {
  t.plan(1);
  t.ok(browser.version, browser.version);
});

test('version is semver compatible', function(t) {
  t.plan(1);
  t.ok(semver.valid(browser.version));
});
