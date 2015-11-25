import _ from 'lodash';
import chalk from 'chalk';

import BrowserWrapper from './BrowserWrapper';
import URIOnlineJudgeURLS from './URIOnlineJudgeURLS.js';

export default class URIOnlineJudge {

  constructor() {
  }

  /**
   * Submit a problem to the URIOnlineJudge website.
   *
   * @param {Object} params - params object.
   * @param {string} params.email - User email.
   * @param {string} params.password - User password.
   * @param {number} params.number - Problem number.
   * @param {string} params.file - Problem file content.
   * @returns {Promise} - Fulfill when question submited. Reject if some error occur.
   */
  static submit({email, password, problem, file}) {
    const browserWrapper = new BrowserWrapper();

    return new Promise((resolve, reject) => {
      browserWrapper
        .init({progress: 'Submitting'})
        .createPhantom()
        .createPage()
        .open({url: URIOnlineJudgeURLS.login})
        .login({email: email, password: password})
        .open({url: URIOnlineJudgeURLS.problemSubmit + problem})
        .submit({file: file})
        .open({url: URIOnlineJudgeURLS.problemSubmissions})
        .waitForAnswer({number: problem})
        .then(answer => {
          URIOnlineJudge.showResult({answer, problem});
          resolve(answer);
        })
        .exit()
        .start()
        .catch((error) => {
          browserWrapper.progress.tick(1000);
          console.log(`\n[*] ${chalk.red('Failed:')} ${error}`);
          reject(error);
        });
    });
  }

  /**
   * Print result on the command line with colors.
   *
   * @param {Object} params - params object.
   * @param {string} params.answer - Problem answer.
   * @param {number} params.problem - Problem number.
   */
  static showResult({answer, problem}) {
    let color = 'white';

    const answers = [
      {
        answer: 'accepted',
        color: 'green',
      },
      {
        answer: 'wrong',
        color: 'red',
      },
      {
        answer: 'find the answer',
        color: 'red',
      },
      {
        answer: 'compilation',
        color: 'yellow',
      },
      {
        answer: 'time limit exceeded',
        color: 'blue',
      },
      {
        answer: 'runtime error',
        color: 'cyan',
      },
      {
        answer: 'presentation error',
        color: 'gray',
      },
    ];

    answers.forEach((item) => {
      if (_.contains(answer.toLowerCase(), item.answer.toLowerCase())) {
        color = item.color;
      }
    });

    const result = chalk[color](`${answer}: ${problem}`);

    console.log(`[*] ${result}`);
  }

}
