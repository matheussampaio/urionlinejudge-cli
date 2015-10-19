#! /usr/bin/env node

import fs from 'fs';
import program from 'commander';

import loadUser from './loadUser';
import BrowserWrapper from './browserWrapper';
import { version } from '../package.json';

program
    .version(version)
    .option('-p, --problem <n>', 'Submit answer for problem <n>.')
    .option('-f, --filepath <filepath>', 'Filepath with answer.')
    .option('-r, --reset', 'reset user infos.')
    .parse(process.argv);

let URLS = {
    base: 'https://www.urionlinejudge.com.br',
    problemView: '/judge/pt/problems/view/',
    problemSubmit: 'https://www.urionlinejudge.com.br/judge/pt/runs/add/',
};

let browserWrapper = new BrowserWrapper();

main();

function main() {
    loadUser(program.reset)
        .then(submitProblem)
        .then(exit)
        .catch((error) => {
            console.error(error);
            return exit();
        });
}

function exit() {
    process.exit();
}

function submitProblem(user) {
    if (!program.filepath) {
        return Promise.reject('Missing filepath');
    } else if (!program.problem) {
        return Promise.reject('Missing problem number');
    }

    const problemfile = fs.readFileSync(program.filepath, 'utf-8');

    return browserWrapper
        .createPhantom()
        .createPage()
        .open({url: URLS.base})
        .login({email: user.email, password: user.password})
        .open({url: URLS.problemSubmit + program.problem})
        .submit({file: problemfile})
        .exit()
        .start();

}
