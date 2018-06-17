const chalk = require('chalk')
const ProgressBar = require('progress')

class Progress {
  constructor (length) {
    this.progress = new ProgressBar(`[*] :status [:bar] :percent :elapseds`, {
      complete: chalk.green(`=`),
      incomplete: ` `,
      width: 40,
      total: length,
      clear: true
    })
  }

  tick (num = 1, status = ``) {
    while (status.length < 20) {
      status += ` `
    }

    this.progress.tick(num, {
      status
    })
  }
}

module.exports = Progress
