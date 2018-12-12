/// <reference types="node" />
interface BrowserInfo {
    name: Browser;
    version: string;
    os: OperatingSystem | null;
}
interface NodeInfo {
    name: 'node';
    version: string;
    os: NodeJS.Platform;
}
interface BotBrowserInfo {
    bot: true;
}
declare type Browser = 'aol' | 'edge' | 'yandexbrowser' | 'vivaldi' | 'kakaotalk' | 'samsung' | 'chrome' | 'phantomjs' | 'crios' | 'firefox' | 'fxios' | 'opera' | 'ie' | 'bb10' | 'android' | 'ios' | 'safari' | 'facebook' | 'instagram' | 'ios-webview' | 'searchbot';
declare type OperatingSystem = 'iOS' | 'Android OS' | 'BlackBerry OS' | 'Windows Mobile' | 'Amazon OS' | 'Windows 3.11' | 'Windows 95' | 'Windows 98' | 'Windows 2000' | 'Windows XP' | 'Windows Server 2003' | 'Windows Vista' | 'Windows 7' | 'Windows 8' | 'Windows 8.1' | 'Windows 10' | 'Windows ME' | 'Open BSD' | 'Sun OS' | 'Linux' | 'Mac OS' | 'QNX' | 'BeOS' | 'OS/2' | 'Search Bot';
export declare function detect(): BrowserInfo | BotBrowserInfo | NodeInfo | null;
export declare function parseUserAgent(ua: string): BrowserInfo | BotBrowserInfo | null;
export declare function detectOS(ua: string): OperatingSystem | null;
export declare function getNodeVersion(): NodeInfo | null;
export {};
