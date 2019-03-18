import Handler from '../base/baseProcessor';

export class HelloWorldProcessor extends Handler {
  async processEvent(event) {
    return {
      outcome: 'Hello World',
    };
  }
}
