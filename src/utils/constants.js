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
  c: 1,
  'c++': 2,
  java: 3,
  python: 4,
  python3: 5,
  ruby: 6,
  'c#': 7,
  scala: 8,
  js: 10,
  java8: 11,
  go: 12,
  c99: 14,
  kotlin: 15,
  'c++17': 16
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
