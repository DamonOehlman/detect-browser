var browsers = [
  [ 'chrome', /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
  [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
  [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
  [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/ ]
];

var match = browsers.map(match).filter(isMatch)[0];

// set the name and version
exports.name = match && match[0];
exports.version = match && match[3].split('.').slice(0,3).join('.');

function match(pair) {
  return pair.concat(pair[1].exec(navigator.userAgent));
}

function isMatch(pair) {
  return !!pair[2];
}
