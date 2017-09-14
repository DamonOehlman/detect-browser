/**
  # detect-browser

  This is a package that attempts to detect a browser vendor and version (in
  a semver compatible format) using a navigator useragent in a browser or
  `process.version` in node.

  ## Example Usage

  <<< examples/simple.js

  Or you can use a switch statement:

  <<< examples/switch.js

  ## Adding additional browser support

  The current list of browsers that can be detected by `detect-browser` is
  not exhaustive. If you have a browser that you would like to add support for
  then please submit a pull request with the implementation.

  Creating an acceptable implementation requires two things:

  1. A test demonstrating that the regular expression you have defined identifies
     your new browser correctly.  Examples of this can be found in the 
     `test/logic.js` file.

  2. Write the actual regex to the `lib/detectBrowser.js` file. In most cases adding
     the regex to the list of existing regexes will be suitable (if usage of `detect-brower`
     returns `undefined` for instance), but in some cases you might have to add it before
     an existing regex.  This would be true for a case where you have a browser that
     is a specialised variant of an existing browser but is identified as the
     non-specialised case.

  When writing the regular expression remember that you would write it containing a
  single [capturing group](https://regexone.com/lesson/capturing_groups) which
  captures the version number of the browser.

**/

var browsers = [
  [ 'edge', /Edge\/([0-9\._]+)/ ],
  [ 'yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
  [ 'vivaldi', /Vivaldi\/([0-9\.]+)/ ],
  [ 'kakaotalk', /KAKAOTALK\s([0-9\.]+)/ ],
  [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
  [ 'phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/ ],
  [ 'crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
  [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
  [ 'fxios', /FxiOS\/([0-9\.]+)/ ],
  [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
  [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
  [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/ ],
  [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
  [ 'ie', /MSIE\s(7\.0)/ ],
  [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
  [ 'android', /Android\s([0-9\.]+)/ ],
  [ 'ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/ ],
  [ 'safari', /Version\/([0-9\._]+).*Safari/ ]
];

function detect() {
  const nodeVersion = getNodeVersion();
  if (nodeVersion) {
    return nodeVersion;
  } else if (typeof navigator !== 'undefined') {
    return parseUserAgent(navigator.userAgent);
  }

  return null;
}

function getNodeVersion() {
  var isNode = typeof navigator === 'undefined' && typeof process !== 'undefined';
  return isNode ? {
    name: 'node',
    version: process.version.slice(1)
  } : null;
}

function parseUserAgent(userAgentString) {
  if (!userAgentString) {
    return null;
  }

  return browsers.map(function (rule) {
    if (rule[1].test(userAgentString)) {
      var match = rule[1].exec(userAgentString);
      var version = match && match[1].split(/[._]/).slice(0,3);

      if (version && version.length < 3) {
        Array.prototype.push.apply(version, (version.length == 1) ? [0, 0] : [0]);
      }

      return {
        name: rule[0],
        version: version.join('.')
      };
    }
  }).filter(Boolean).shift();
}

module.exports = {
  detect: detect,
  getNodeVersion: getNodeVersion,
  parseUserAgent: parseUserAgent
};
