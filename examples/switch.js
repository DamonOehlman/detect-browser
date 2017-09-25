const { detect } = require('..');
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
