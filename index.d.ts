export interface BrowserVersion {
    name: string
    version: string
    os: string
}

export function parseUserAgent(userAgentString: string): BrowserVersion | null;

export function detectOS(userAgentString: string): string | null;

export function getNodeVersion(): BrowserVersion | null;

export function detect(): ReturnType<typeof parseUserAgent | typeof getNodeVersion>;
