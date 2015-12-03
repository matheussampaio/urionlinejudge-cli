import chalk from 'chalk';

export default class Log {
  constructor() {
  }

  static _log({status, message = []}) {
    const pre = '[*]';

    console.log(`${pre} ${status}`);

    if (message instanceof Array) {
      for (let i = 0; i < message.length; i++) {
        console.log(`${pre} ${message[i]}`);
      }
    } else {
      console.log(`${pre} ${message}`);
    }
  }

  static success(message) {
    Log._log({
      message,
      status: chalk.green('Success:'),
    });
  }

  static error(message) {
    Log._log({
      message,
      status: chalk.red('Error:'),
    });
  }

  static warning(message) {
    Log._log({
      message,
      status: chalk.yellow('Warning:'),
    });
  }
}
