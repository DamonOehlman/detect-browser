const browser = require('..');

// handle the case where we don't detect the browser
if (browser) {
  console.log(browser.name);
  console.log(browser.version);
}
