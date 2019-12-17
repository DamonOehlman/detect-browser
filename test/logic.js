var test = require('tape');
var { parseUserAgent } = require('../');

function assertAgentString(t, agentString, expectedResult) {
  t.deepEqual(parseUserAgent(agentString), expectedResult);
}

test('detects Chrome', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
    { name: 'chrome', version: '50.0.2661', os: 'Linux' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    { name: 'chrome', version: '41.0.2228', os: 'Windows 7' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
    { name: 'chrome', version: '72.0.3626', os: 'Windows 10' },
  );

  t.end();
});

test('detects Chrome for iOS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3',
    { name: 'crios', version: '19.0.1084', os: 'iOS' },
  );

  t.end();
});

test('detects Firefox', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
    { name: 'firefox', version: '46.0.0', os: 'Linux' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
    { name: 'firefox', version: '40.1.0', os: 'Windows 7' },
  );

  t.end();
});

test('detects Firefox for iOS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4',
    { name: 'fxios', version: '1.0.0', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/3.2 Mobile/12F69 Safari/600.1.4',
    { name: 'fxios', version: '3.2.0', os: 'iOS' },
  );

  t.end();
});

test('detects Edge', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    { name: 'edge', version: '12.246.0', os: 'Windows 10' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0 (Touch; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; H9P; InfoPath',
    { name: 'edge', version: '12.0.0', os: 'Windows 8.1' },
  );

  t.end();
});

test('detects IE', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko',
    { name: 'ie', version: '11.0.0', os: 'Windows 8.1' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0; MSN 11.61; MSNbMSNI; MSNmen-us; MSNcOTH) like Gecko',
    { name: 'ie', version: '11.0.0', os: 'Windows 10' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0',
    { name: 'ie', version: '10.6.0', os: 'Windows 7' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 5.2; WOW64; .NET CLR 2.0.50727)',
    { name: 'ie', version: '7.0.0', os: 'Windows Server 2003' },
  );

  t.end();
});

test('detects Opera', function(t) {
  assertAgentString(
    t,
    'Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15',
    { name: 'opera', version: '9.80.0', os: 'Windows XP' },
  );

  assertAgentString(t, 'Opera/9.25 (Macintosh; Intel Mac OS X; U; en)', {
    name: 'opera',
    version: '9.25.0',
    os: 'Mac OS',
  });

  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36 OPR/38.0.2220.31',
    { name: 'opera', version: '38.0.2220', os: 'Mac OS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.28 Safari/537.36 OPR/61.0.3282.0 (Edition developer)',
    { name: 'opera', version: '61.0.3282', os: 'Mac OS' },
  );

  t.end();
});

test('detects BlackBerry 10', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/7.2.0.0 Mobile Safari/537.10+',
    { name: 'bb10', version: '7.2.0', os: 'BlackBerry OS' },
  );

  t.end();
});

test('detects Android Webkit browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    { name: 'android', version: '4.0.3', os: 'Android OS' },
  );

  t.end();
});

test('detects mobile Safari', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
    { name: 'ios', version: '6.0.0', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
    { name: 'ios', version: '5.0.2', os: 'iOS' },
  );

  t.end();
});

test('detects Safari', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
    { name: 'safari', version: '7.0.3', os: 'Mac OS' },
  );

  t.end();
});

test('detects Yandex Browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 YaBrowser/16.10.0.2774 Safari/537.36',
    { name: 'yandexbrowser', version: '16.10.0', os: 'Mac OS' },
  );

  t.end();
});

test('detects Vivaldi Browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 Vivaldi/1.2.490.43',
    { name: 'vivaldi', version: '1.2.490', os: 'Mac OS' },
  );

  t.end();
});

test('detects Kakaotalk Browser', function(t) {
  assertAgentString(
    t,
    'Netscape 5.0 (iPhone; CPU iPhone OS 10_3 1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 KAKAOTALK 6.2.2',
    { name: 'kakaotalk', version: '6.2.2', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS  10_3 1 like Mac OS X) AppleWebKit/  603.1.30 (KHTML, like Gecko) Mobile/ 14E304 KAKAOTALK 6.2.2',
    { name: 'kakaotalk', version: '6.2.2', os: 'iOS' },
  );

  t.end();
});

test('detects PhantomJS Browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1',
    { name: 'phantomjs', version: '2.1.1', os: 'Mac OS' },
  );

  t.end();
});

test('detects AOLShield Browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2841.00 Safari/537.36 AOLShield/54.0.2848.0',
    { name: 'aol', version: '54.0.2848', os: 'Windows 10' },
  );

  t.end();
});

test('detects facebook in-app browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 [FBAN/FBIOS;FBAV/157.0.0.42.96;FBBV/90008621;FBDV/iPhone9,1;FBMD/iPhone;FBSN/iOS;FBSV/11.2.5;FBSS/2;FBCR/Verizon;FBID/phone;FBLC/en_US;FBOP/5;FBRV/0]',
    { name: 'facebook', version: '157.0.0', os: 'iOS' },
  );

  t.end();
});

test('detects instagram in-app browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 Instagram 8.4.0 (iPhone7,2; iPhone OS 9_3_2; nb_NO; nb-NO; scale=2.00; 750x1334',
    { name: 'instagram', version: '8.4.0', os: 'iOS' },
  );

  t.end();
});

test('detects native iOS WebView browser', function(t) {
  assertAgentString(
    t,
    'User-Agent: Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile',
    { name: 'ios-webview', version: '533.17.9', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPad; CPU OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E216',
    { name: 'ios-webview', version: '605.1.15', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92',
    { name: 'ios-webview', version: '605.1.15', os: 'iOS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    { name: 'ios-webview', version: '605.1.15', os: 'iOS' },
  );

  t.end();
});

test('detects Samsung Internet browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-G925F Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
    { name: 'samsung', version: '4.0.0', os: 'Android OS' },
  );

  t.end();
});

test('detects crawler: AhrefsBot', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (compatible; AhrefsBot/5.2; +http://ahrefs.com/robot/)',
    { bot: true, name: 'bot', version: null, os: null },
  );

  t.end();
});

test('detects crawler: GoogleBot', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36',
    { bot: true, name: 'bot', version: null, os: null },
  );

  t.end();
});

test('detects crawler: YandexBot', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    { bot: true, name: 'bot', version: null, os: null },
  );

  t.end();
});

test('detects Opera-Mini', function(t) {
  assertAgentString(
    t,
    'Opera/9.80 (Android; Opera Mini/8.0.1807/36.1609; U; en) Presto/2.12.423 Version/12.16',
    { name: 'opera-mini', version: '12.16.0', os: 'Android OS' },
  );

  assertAgentString(
    t,
    'Opera/9.80 (BlackBerry; Opera Mini/6.5.27548/27.2020; U; en) Presto/2.8.119 Version/11.10',
    { name: 'opera-mini', version: '11.10.0', os: 'BlackBerry OS' },
  );
  t.end();
});

test('detects Silk', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/44.1.54 like Chrome/44.0.2403.63 Safari/537.36',
    { name: 'silk', version: '44.1.54', os: 'Android OS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Silk/44.1.54 like Chrome/44.0.2403.63 Safari/537.36',
    { name: 'silk', version: '44.1.54', os: 'Linux' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; U; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/44.1.54 like Chrome/44.0.2403.63 Mobile Safari/537.36',
    { name: 'silk', version: '44.1.54', os: 'Android OS' },
  );

  t.end();
});

test('detects Chrome OS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (X11; CrOS x86_64 10895.78.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.120 Safari/537.36',
    { name: 'chrome', version: '69.0.3497', os: 'Chrome OS' },
  );

  assertAgentString(
    t,
    'Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Gecko/20100101 Firefox/29.0',
    { name: 'firefox', version: '29.0.0', os: 'Chrome OS' },
  );
  t.end();
});

test('detects miui', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; U; Android 7.0; en-us; MI 5 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.146 Mobile Safari/537.36 XiaoMi/MiuiBrowser/9.0.3',
    { name: 'miui', version: '9.0.3', os: 'Android OS' },
  );
  t.end();
});

test('detects Beaker Browser', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) BeakerBrowser/0.8.7 Chrome/69.0.3497.128 Electron/4.1.3 Safari/537.36',
    { name: 'beaker', version: '0.8.7', os: 'Windows 10' },
  );
  t.end();
});

test('detects edge chromium', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.48 Safari/537.36 Edg/74.1.96.24',
    { name: 'edge-chromium', version: '74.1.96', os: 'Windows 10' },
  );
  t.end();
});

test('detects edge iOS', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 EdgiOS/44.2.1 Mobile/16D57 Safari/605.1.15',
    { name: 'edge-ios', version: '44.2.1', os: 'iOS' },
  );
  t.end();
});

test('handles no browser', function(t) {
  assertAgentString(t, null, null);

  t.end();
});

/* https://developer.chrome.com/multidevice/user-agent */
test('detects Chromium-based WebView On Android', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
    { name: 'chromium-webview', version: '43.0.2357', os: 'Android OS' },
  );
  t.end();
});

test('detects extended bot info', function(t) {
  assertAgentString(
    t,
    'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    {
      name: 'chrome',
      version: '41.0.2272',
      os: 'Android OS',
      bot: 'Googlebot',
    },
  );

  t.end();
});
