import chalk from 'chalk';
import ProgressBar from 'progress';

export default class Progress {

  constructor(length) {
    this.progress = new ProgressBar(`[*] :status [:bar] :percent :elapseds`, {
      complete: chalk.green('='),
      incomplete: ' ',
      width: 40,
      total: length,
      clear: true
    });
  }

  tick(num = 1, status = '') {
    while (status.length < 20) {
      status += ' ';
    }

    this.progress.tick(num, {
      status
    });
  }
}
