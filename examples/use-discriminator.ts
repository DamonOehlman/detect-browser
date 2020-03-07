/* tslint:disable:no-console */
import { detect } from '../src';

const result = detect();
if (result) {
  switch (result.type) {
    case 'bot':
      // result is an instanceof BotInfo
      console.log(`found ${result.name} bot`);
      break;

    case 'bot-device':
      // result is an instanceof SearchBotDeviceInfo
      console.log(`found ${result.name} device bot`);
      break;

    case 'browser':
      // result is an instanceof BrowserInfo
      console.log(`found ${result.name} browser`);
      break;

    case 'node':
      // result is an instanceof NodeInfo
      console.log(`found node version ${result.version}`);
      break;
  }
}
