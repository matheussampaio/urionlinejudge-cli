#! /usr/bin/env node

import fs from 'fs';
import _ from 'lodash';
import program from 'commander';
import BrowserWrapper from './browserWrapper';
import config from '../../config.json';
program
    .version('0.0.1')
    .option('-p, --problem <n>', 'Submit answer for problem <n>.')
    .option('-f, --filepath <filepath>', 'Filepath with answer.')
    .parse(process.argv);

var URLS = {
    base: 'https://www.urionlinejudge.com.br',
    problemView: '/judge/pt/problems/view/',
    problemSubmit: 'https://www.urionlinejudge.com.br/judge/pt/runs/add/',
};

main();

function main() {
    if (_.isEmpty(config.email) || _.isEmpty(config.password)) {
        return console.error('Missing EMAIL and/or PASSWORD on config.json');
    }

    let browserWrapper = new BrowserWrapper();

    const problemfile = fs.readFileSync(program.filepath, 'utf-8');

    browserWrapper
        .createPhantom()
        .createPage()
        .open({url: URLS.base})
        .login({email: config.email, password: config.password})
        .open({url: URLS.problemSubmit + program.problem})
        .submit({file: problemfile})
        .exit()
        .start();
}
