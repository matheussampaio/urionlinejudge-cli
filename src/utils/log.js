const chalk = require('chalk')

class Log {
  log ({ status, message = [] } = {}) {
    const pre = `[*]`

    console.log(`${pre} ${status}`)

    if (message instanceof Array) {
      for (let i = 0; i < message.length; i++) {
        console.log(`${pre} ${message[i]}`)
      }
    } else {
      console.log(`${pre} ${message}`)
    }
  }

  status (status, ...message) {
    return this.log({
      status,
      message
    })
  }

  success (...message) {
    return this.log({
      message,
      status: chalk.green(`Success:`)
    })
  }

  error (error) {
    return this.log({
      message: error.stack ? error.stack : error,
      status: chalk.red(`Error:`)
    })
  }

  warning (...message) {
    return this.log({
      message,
      status: chalk.yellow(`Warning:`)
    })
  }
}

module.exports = new Log()
