var test = require('tape');
var { parseUserAgent } = require('../');

test('detects Chrome for iOS (iPhone variant)', function(t) {
  const browser = parseUserAgent('Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3');
  t.plan(7);
  t.ok(browser, 'browser detected');
  t.equal(browser.name, 'crios');
  t.equal(browser.isVariant('iPhone'), true);
  t.equal(browser.isVariant('iphone'), true);
  t.equal(browser.isVariant('iPad'), false);
  t.equal(browser.isVariant('ipad'), false);
  t.equal(browser.isVariant(), false);
  t.end();
});

test('detects Chrome for iOS (iPad variant)', function(t) {
  const browser = parseUserAgent('Mozilla/5.0 (iPad; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3');
  t.plan(7);
  t.ok(browser, 'browser detected');
  t.equal(browser.name, 'crios');
  t.equal(browser.isVariant('iPhone'), false);
  t.equal(browser.isVariant('iphone'), false);
  t.equal(browser.isVariant('iPad'), true);
  t.equal(browser.isVariant('ipad'), true);
  t.equal(browser.isVariant(), false);
  t.end();
});

test('detects mobile Safari (iPhone variant)', function(t) {
  const browser = parseUserAgent('Mozilla/5.0 (iPhone; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25');
  t.plan(7);
  t.ok(browser, 'browser detected');
  t.equal(browser.name, 'ios');
  t.equal(browser.isVariant('iPhone'), true);
  t.equal(browser.isVariant('iphone'), true);
  t.equal(browser.isVariant('iPad'), false);
  t.equal(browser.isVariant('ipad'), false);
  t.equal(browser.isVariant(), false);
  t.end();
});

test('detects mobile Safari (iPad variant)', function(t) {
  const browser = parseUserAgent('Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25');
  t.plan(7);
  t.ok(browser, 'browser detected');
  t.equal(browser.name, 'ios');
  t.equal(browser.isVariant('iPhone'), false);
  t.equal(browser.isVariant('iphone'), false);
  t.equal(browser.isVariant('iPad'), true);
  t.equal(browser.isVariant('ipad'), true);
  t.equal(browser.isVariant(), false);
  t.end();
});
