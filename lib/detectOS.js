module.exports = function detectOS(userAgentString) {
  var operatingSystems = [
    {
      name: 'iOS',
      rule: /iP(hone|od|ad)/
    },
    {
      name: 'Android OS',
      rule: /Android/
    },
    {
      name: 'BlackBerry OS',
      rule: /BlackBerry|BB10/
    },
    {
      name: 'Windows Mobile',
      rule: /IEMobile/
    },
    {
      name: 'Amazon OS',
      rule: /Kindle/
    },
    {
      name: 'Windows 3.11',
      rule: /Win16/
    },
    {
      name: 'Windows 95',
      rule: /(Windows 95)|(Win95)|(Windows_95)/
    },
    {
      name: 'Windows 98',
      rule: /(Windows 98)|(Win98)/
    },
    {
      name: 'Windows 2000',
      rule: /(Windows NT 5.0)|(Windows 2000)/
    },
    {
      name: 'Windows XP',
      rule: /(Windows NT 5.1)|(Windows XP)/
    },
    {
      name: 'Windows Server 2003',
      rule: /(Windows NT 5.2)/
    },
    {
      name: 'Windows Vista',
      rule: /(Windows NT 6.0)/
    },
    {
      name: 'Windows 7',
      rule: /(Windows NT 6.1)/
    },
    {
      name: 'Windows 8',
      rule: /(Windows NT 6.2)/
    },
    {
      name: 'Windows 8.1',
      rule: /(Windows NT 6.3)/
    },
    {
      name: 'Windows 10',
      rule: /(Windows NT 10.0)/
    },
    {
      name: 'Windows ME',
      rule: /Windows ME/
    },
    {
      name: 'Open BSD',
      rule: /OpenBSD/
    },
    {
      name: 'Sun OS',
      rule: /SunOS/
    },
    {
      name: 'Linux',
      rule: /(Linux)|(X11)/
    },
    {
      name: 'Mac OS',
      rule: /(Mac_PowerPC)|(Macintosh)/
    },
    {
      name: 'QNX',
      rule: /QNX/
    },
    {
      name: 'BeOS',
      rule: /BeOS/
    },
    {
      name: 'OS/2',
      rule: /OS\/2/
    },
    {
      name: 'Search Bot',
      rule: /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/
    }
  ];

  var detected = operatingSystems.filter(function (os) {
    if (userAgentString.match(os.rule)) {
      return true;
    }
  });

  return detected && detected[0] ? detected[0].name : null;
};
