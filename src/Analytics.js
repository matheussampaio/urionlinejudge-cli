import AnalyticsNode from 'analytics-node';

import { version, debug } from '../package.json';

class Analytics {

  constructor() {
    this.session = new AnalyticsNode('Z3ZdOzxPdnao1KwvKzzXS9QLjag1pjI9');
  }

  _track({event, properties}) {
    if (debug) {
      console.log('analytics:', event, properties);
    }

    return new Promise(resolve => {
      this.session.track({
        userId: 'anonymous_user',
        event: `${version}-${event}`,
        properties: properties,
        integrations: {
          'Google Analytics': false,
        },
      });

      resolve();
    });
  }

  error(properties = {}) {
    return this._track({
      event: 'error',
      properties: properties,
    });
  }

  submit({problem, result}) {
    return this._track({
      event: 'command',
      properties: {
        command: 'submit',
        problem,
        result,
      },
    });
  }

  flush() {
    return new Promise(resolve => {
      if (debug) {
        resolve();
      } else {
        this.session.flush(() => {
          resolve();
        });
      }
    });
  }
}

const singleton = new Analytics();

export default singleton;
