var detectBrowser = require('./lib/detectBrowser');

module.exports = detectBrowser(navigator.userAgent);
