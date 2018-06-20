/**
 * URLS Constants
 *
 * @type {Object}
 */

const BASE = `https://www.urionlinejudge.com.br`

const URLS = {
  BASE,

  LOGIN: `${BASE}/judge/en/login`,
  PROBLEM_VIEW: `${BASE}/judge/pt/problems/view/`,
  PROBLEM_SUBMIT: `${BASE}/judge/pt/runs/add/`,
  PROBLEM_SUBMISSIONS: `${BASE}/judge/pt/runs`
}

const LANGUAGES = {
  1: 'C',
  2: 'C++',
  3: 'Java 7',
  4: 'Python',
  5: 'Python3',
  6: 'Ruby',
  7: 'C#',
  8: 'Scala',
  10: 'Javascript',
  11: 'Java 8',
  12: 'Go',
  14: 'C99',
  15: 'Kotlin',
  16: 'C++17'
}

const ANSWERS = [
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
    answer: 'timeout',
    color: 'red'
  }
]

module.exports = { ANSWERS, LANGUAGES, URLS }
