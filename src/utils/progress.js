import chalk from 'chalk';
import ProgressBar from 'progress';

export default class Progress {

  constructor(title, length) {
    this.progress = new ProgressBar(`[*] ${title} [:bar] :percent :elapseds`, {
      complete: chalk.green('='),
      incomplete: ' ',
      width: 40,
      total: length,
      clear: true,
    });
  }

  tick() {
    this.progress.tick();
  }
}
