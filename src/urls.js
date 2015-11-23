/**
 * URLS Constants
 *
 * @type {Object}
 */

const base = 'https://www.urionlinejudge.com.br';

const URLS = {
    base,

    login: base + '/judge/login',
    problemView: base + '/judge/pt/problems/view/',
    problemSubmit: base + '/judge/pt/runs/add/',
    problemSubmissions: base + '/judge/pt/runs',
};

export default URLS;
