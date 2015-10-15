#! /usr/bin/env node

import fs from 'fs';
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
    // if (_.isEmpty(config.email) || _.isEmpty(config.password)) {
    //     return console.error('Missing EMAIL and PASSWORD on config.json');
    // }

    let browserWrapper = new BrowserWrapper();

    browserWrapper
        .create()
        .open(URLS.base)
        .screenshot('uri.png')
        .open('http://www.google.com')
        .screenshot('google.png')
        .start();

        // .then(() => {
        //     return browser.evaluate((config) => {
        //         document.getElementById('UserEmail').value = config.email;
        //         document.getElementById('UserPassword').value = config.password;
        //         document.forms[0].submit();
        //     }, () => {
        //
        //     },
        //     config);
        // })
        // .then(() => {
        //     return wait(2000);
        // })
        // .then(() => {
        //     return browser.screenshot('logged.png');
        // })
        // .then(() => {
        //     return browser.open(URLS.problemSubmit + program.problem);
        // })
        // .then(() => {
        //     return browser.screenshot('problem.png');
        // })
        // .then(() => {
        //     let file = fs.readFileSync(program.filepath, 'utf-8');
        //
        //     return browser.evaluate((file) => {
        //         editor.getSession().setValue(file);
        //         $('.send-submit').click();
        //     }, () => {
        //
        //     }, file);
        // })
        // .then(() => {
        //     return wait(2000);
        // })
        // .then(() => {
        //     return browser.exit();
        // });
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
