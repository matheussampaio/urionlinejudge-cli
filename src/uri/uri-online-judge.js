import co from 'co';
import _ from 'lodash';
import chalk from 'chalk';
import Nightmare from 'nightmare';

import Log from '../utils/log';
import Progress from '../utils/progress';
import URIOnlineJudgeURLS from './uri-online-judge-urls.js';

export default class URIOnlineJudge {

  constructor() {
  }

  /**
   * Submit a problem to the URIOnlineJudge website.
   *
   * @param {Object} params - params object.
   * @param {string} params.email - User email.
   * @param {string} params.password - User password.
   * @param {number} params.problem - Problem number.
   * @param {string} params.file - Problem file content.
   * @returns {Promise} - Fulfill when question submited. Reject if some error occur.
   */
  static submit({ email, password, problem, file, code }) {
    const browser = new Nightmare({ show: process.env.DEBUG });
    const progress = new Progress('Submitting', 3);

    return co.wrap(function* submitGenerator() {
      // LOGIN
      // TODO: check if login is success
      const url = yield browser
        .goto(URIOnlineJudgeURLS.login)
        .url();

      if (url === URIOnlineJudgeURLS.login) {
        yield browser
          .type('input[id=email]', email)
          .type('input[id=password]', password)
          .click('input[type=submit]');
      }

      progress.tick();

      // SUBMIT PROBLEM
      yield browser
        .goto(URIOnlineJudgeURLS.problemSubmit + problem)
        .evaluate(options => {
          document.getElementById('language-id').selectedIndex = options.code;
          editor.getSession().setValue(options.file); //eslint-disable-line
        }, { file, code })
        .click('input[type=submit]');

      progress.tick();

      // WAIT PROBLEM ANSWER
      let countTryies = 30;
      let answer = '- In queue -';

      while (answer === '- In queue -' && countTryies-- > 0) {
        answer = yield browser
          .wait(1000)
          .goto(URIOnlineJudgeURLS.problemSubmissions)
          .evaluate(URIOnlineJudge._getAnswer, {
            number: problem
          });
      }

      if (countTryies <= 0) {
        answer = 'Timeout';
      }

      progress.tick();

      URIOnlineJudge.showResult({ answer, problem });

      // FINISH
      return yield browser
        .end();
    })()
    .catch(error => {
      console.error(error.stack ? error.stack : error);
    });
  }

  /**
   * Fetch a question description from URI Online Judge Webstie
   * @param {Object} params - params Object.
   * @param {number} params.problem - Problem number.
   * @returns {Promise} - Fulfill when question description fetched.
   *                      Reject if some error occur.
   */
  static fetch({ problemNumber }) {
    const browser = new Nightmare({ show: process.env.DEBUG });
    const progress = new Progress('Fetching', 3);

    return co.wrap(function* fetchGenerator() {
      yield browser.goto(URIOnlineJudgeURLS.problemView + problemNumber);
      progress.tick();
      const description = yield browser.evaluate(URIOnlineJudge._getDescription);
      progress.tick();
      yield browser.end();
      progress.tick();

      return yield Promise.resolve(description);
    })();
  }

  /**
   * Print result on the command line with colors.
   *
   * @param {Object} params - params object.
   * @param {string} params.answer - Problem answer.
   * @param {number} params.problem - Problem number.
   */
  static showResult({ answer, problem }) {
    let color = 'white';

    const answers = [
      {
        answer: 'accepted',
        color: 'green'
      },
      {
        answer: 'wrong',
        color: 'red'
      },
      {
        answer: 'find the answer',
        color: 'red'
      },
      {
        answer: 'compilation error',
        color: 'yellow'
      },
      {
        answer: 'time limit exceeded',
        color: 'blue'
      },
      {
        answer: 'runtime error',
        color: 'cyan'
      },
      {
        answer: 'presentation error',
        color: 'gray'
      },
      {
        answer: 'Timout',
        color: 'red'
      }
    ];

    answers.forEach((item) => {
      if (_.includes(answer.toLowerCase(), item.answer.toLowerCase())) {
        color = item.color;
      }
    });

    const result = chalk[color](`${answer}: ${problem}`);

    Log.success(`Result = ${result}`);
  }

  static _getAnswer(options) {
    const table = document.getElementById('element').children[0];
    const tbody = table.children[1];
    let answerTmp = '- In queue -';

    for (let i = 0; i < tbody.children.length; i++) {
      const tr = tbody.children[i];

      const tiny = tr.getElementsByClassName('tiny')[0].innerText;

      if (options.number === parseInt(tiny, 10)) {
        answerTmp = tr.getElementsByClassName('answer')[0].innerText;
        break;
      }
    }

    return answerTmp;
  }

  static _getDescription() {
    const iframe = $('#description-html').contents(); //eslint-disable-line

    const problem = {
      title: iframe.find('.header>h1')[0].textContent.trim(),
      timelimit: iframe.find('.header>strong')[0].textContent.trim(),
      description: iframe.find('.problem .description')[0].textContent.trim(),
      input: iframe.find('.problem .input')[0].textContent.trim(),
      output: iframe.find('.problem .output')[0].textContent.trim(),
    };

    return problem;
  }
}
