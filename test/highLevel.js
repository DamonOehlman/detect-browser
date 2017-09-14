var semver = require('semver');
var { detect } = require('../');
var test = require('tape');

test('can run detection', function(t) {
  t.ok(detect(), 'detection ran ok');
  t.end();
});

test('name detected', function(t) {
  const browser = detect();
  t.ok(browser.name, browser.name);
  t.end();
});

test('version detected', function(t) {
  const browser = detect();
  t.ok(browser.version, browser.version);
  t.end();
});

test('version is semver compatible', function(t) {
  const browser = detect();
  t.ok(semver.valid(browser.version));
  t.end();
});
