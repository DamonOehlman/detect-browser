(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BrowserInfo = /** @class */ (function () {
        function BrowserInfo(name, version, os) {
            this.name = name;
            this.version = version;
            this.os = os;
        }
        return BrowserInfo;
    }());
    exports.BrowserInfo = BrowserInfo;
    var NodeInfo = /** @class */ (function () {
        function NodeInfo(version) {
            this.version = version;
            this.name = 'node';
            this.os = process.platform;
        }
        return NodeInfo;
    }());
    exports.NodeInfo = NodeInfo;
    var BotInfo = /** @class */ (function () {
        function BotInfo() {
            this.bot = true;
            this.name = 'bot';
            this.version = null;
            this.os = null;
        }
        return BotInfo;
    }());
    exports.BotInfo = BotInfo;
    var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
    var SEARCHBOT_OS_REGEX = /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/;
    var REQUIRED_VERSION_PARTS = 3;
    var userAgentRules = [
        ['aol', /AOLShield\/([0-9\._]+)/],
        ['edge', /Edge\/([0-9\._]+)/],
        ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
        ['vivaldi', /Vivaldi\/([0-9\.]+)/],
        ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
        ['samsung', /SamsungBrowser\/([0-9\.]+)/],
        ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
        ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
        ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
        ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
        ['fxios', /FxiOS\/([0-9\.]+)/],
        ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
        ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
        ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
        ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
        ['ie', /MSIE\s(7\.0)/],
        ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
        ['android', /Android\s([0-9\.]+)/],
        ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
        ['safari', /Version\/([0-9\._]+).*Safari/],
        ['facebook', /FBAV\/([0-9\.]+)/],
        ['instagram', /Instagram\s([0-9\.]+)/],
        ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
        ['searchbot', SEARCHBOX_UA_REGEX]
    ];
    var operatingSystemRules = [
        ['iOS', /iP(hone|od|ad)/],
        ['Android OS', /Android/],
        ['BlackBerry OS', /BlackBerry|BB10/],
        ['Windows Mobile', /IEMobile/],
        ['Amazon OS', /Kindle/],
        ['Windows 3.11', /Win16/],
        ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
        ['Windows 98', /(Windows 98)|(Win98)/],
        ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
        ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
        ['Windows Server 2003', /(Windows NT 5.2)/],
        ['Windows Vista', /(Windows NT 6.0)/],
        ['Windows 7', /(Windows NT 6.1)/],
        ['Windows 8', /(Windows NT 6.2)/],
        ['Windows 8.1', /(Windows NT 6.3)/],
        ['Windows 10', /(Windows NT 10.0)/],
        ['Windows ME', /Windows ME/],
        ['Open BSD', /OpenBSD/],
        ['Sun OS', /SunOS/],
        ['Linux', /(Linux)|(X11)/],
        ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
        ['QNX', /QNX/],
        ['BeOS', /BeOS/],
        ['OS/2', /OS\/2/],
        ['Search Bot', SEARCHBOT_OS_REGEX]
    ];
    function detect() {
        if (typeof navigator !== 'undefined') {
            return parseUserAgent(navigator.userAgent);
        }
        return getNodeVersion();
    }
    exports.detect = detect;
    function parseUserAgent(ua) {
        // opted for using reduce here rather than Array#first with a regex.test call
        // this is primarily because using the reduce we only perform the regex
        // execution once rather than once for the test and for the exec again below
        // probably something that needs to be benchmarked though
        var matchedRule = ua !== '' &&
            userAgentRules.reduce(function (matched, _a) {
                var browser = _a[0], regex = _a[1];
                if (matched) {
                    return matched;
                }
                var match = regex.exec(ua);
                return !!match && [browser, match];
            }, false);
        if (!matchedRule) {
            return null;
        }
        var name = matchedRule[0], match = matchedRule[1];
        if (name === 'searchbot') {
            return new BotInfo();
        }
        var version = match[1] && match[1].split(/[._]/).slice(0, 3);
        if (version) {
            if (version.length < REQUIRED_VERSION_PARTS) {
                version = version.concat(new Array(REQUIRED_VERSION_PARTS - version.length).fill('0'));
            }
        }
        else {
            version = [];
        }
        return new BrowserInfo(name, version.join('.'), detectOS(ua));
    }
    exports.parseUserAgent = parseUserAgent;
    function detectOS(ua) {
        var match = operatingSystemRules.find(function (_a) {
            var _ = _a[0], regex = _a[1];
            return regex.test(ua);
        });
        return match ? match[0] : null;
    }
    exports.detectOS = detectOS;
    function getNodeVersion() {
        var isNode = typeof process !== 'undefined' && process.version;
        return isNode ? new NodeInfo(process.version.slice(1)) : null;
    }
    exports.getNodeVersion = getNodeVersion;
});
