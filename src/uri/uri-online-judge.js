const _ = require('lodash')
const chalk = require('chalk')
const puppeteer = require('puppeteer')

const Log = require('../utils/log')
const Progress = require('../utils/progress')
const { ANSWERS, URLS } = require('../utils/constants')
const { wait } = require('../utils')

class URIOnlineJudge {
  /**
   * Submit a problem to the URIOnlineJudge website.
   *
   * @param {Object} params - params object.
   * @param {string} params.email - User email.
   * @param {string} params.password - User password.
   * @param {number} params.problemNumber - Problem number.
   * @param {string} params.file - Problem file content.
   * @returns {Promise} - Fulfill when question submited. Reject if some error occur.
   */
  static async submit ({ email, password, problemNumber, file, language }) {
    const browser = await puppeteer.launch({
      slowMo: 200,
      headless: process.env.DEBUG
    })
    const page = await browser.newPage()
    const progress = new Progress(3)

    progress.tick(0, 'log in...')
    await URIOnlineJudge.login({ page, email, password })

    // SUBMIT PROBLEM
    progress.tick(1, 'submiting problem...')
    await URIOnlineJudge.submitProblem({ page, problemNumber, language, file })

    progress.tick(1, 'waiting for answer')
    const answer = await URIOnlineJudge.waitAnswer({ page, problemNumber, progress })

    progress.tick()

    URIOnlineJudge.showResult({ answer, problemNumber })

    // FINISH
    await browser.close()

    return answer
  }

  /**
   * Print result on the command line with colors.
   *
   * @param {Object} params - params object.
   * @param {string} params.answer - Problem answer.
   * @param {number} params.problem - Problem number.
   */
  static showResult ({ answer, problemNumber }) {
    let color = 'white'

    ANSWERS.forEach((item) => {
      if (_.includes(answer.toLowerCase(), item.answer.toLowerCase())) {
        color = item.color
      }
    })

    const status = chalk[color](answer)

    Log.status(status, problemNumber)
  }

  static async login ({ page, email, password }) {
    await page.goto(URLS.LOGIN)

    if (page.url() === URLS.LOGIN) {
      await page.type('input[id=email]', email)
      await page.type('input[id=password]', password)
      await page.click('input[type=submit]')
    }
  }

  static async submitProblem ({ page, problemNumber, language, file }) {
    await page.goto(URLS.PROBLEM_SUBMIT + problemNumber)

    await page.evaluate(options => {
      document.getElementById('language-id').value = options.language

      editor.getSession().setValue(options.file) //eslint-disable-line
    }, { file, language })

    await page.click('input[type=submit]')
  }

  static async waitAnswer ({ page, problemNumber, progress }) {
    // WAIT PROBLEM ANSWER
    let countTries = 120
    let answer = '- In queue -'

    await page.goto(URLS.PROBLEM_SUBMISSIONS)

    while (answer === '- In queue -' && countTries-- > 0) {
      await wait(1000)
      await page.reload()

      answer = await page.evaluate(options => {
        const table = document.getElementById('element').children[0]
        const tbody = table.children[1]
        let answerTmp = '- In queue -'

        for (let i = 0; i < tbody.children.length; i++) {
          const tr = tbody.children[i]

          const tiny = tr.getElementsByClassName('tiny')[0].innerText

          if (options.problemNumber === parseInt(tiny, 10)) {
            answerTmp = tr.getElementsByClassName('answer')[0].innerText
            break
          }
        }

        return answerTmp
      }, {
        problemNumber
      })

      progress.tick(0, answer)
    }

    if (countTries <= 0) {
      answer = 'Timeout'
    }

    return answer
  }
}

module.exports = URIOnlineJudge
