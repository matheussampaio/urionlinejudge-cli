#! /usr/bin/env node

import fs from 'fs';
import _ from 'lodash';
import cli from './cli';
import chalk from 'chalk';
import URLS from './urls';
import loadUser from './loadUser';
import BrowserWrapper from './browserWrapper';

main();

function main() {
    const commands = {
        reset: reset,
        submit: submit,
    };

    commands[cli.command]()
        .then(process.exit)
        .catch((error) => {
            console.error(error);
            return process.exit();
        });
}

function reset() {
    return loadUser(true);
}

function submit() {
    const problemfile = fs.readFileSync(cli.filepath, 'utf-8');

    let browserWrapper = new BrowserWrapper();

    return loadUser()
        .then(user => {
            return browserWrapper
                .init({progress: 'Submitting'})
                .createPhantom()
                .createPage()
                .open({url: URLS.base})
                .login({email: user.email, password: user.password})
                .open({url: URLS.problemSubmit + cli.number})
                .submit({file: problemfile})
                .open({url: URLS.problemSubmissions})
                .waitForAnswer({number: cli.number})
                .then(_showResult)
                .exit()
                .start();
        });
}

function _showResult(answer) {
    let color = 'red';

    if (_.contains(answer.toLowerCase(), 'accepted')) {
        color = 'green';
    } else if (_.contains(answer.toLowerCase(), 'wrong')) {
        color = 'red';
    } else if (_.contains(answer.toLowerCase(), 'compilation')) {
        color = 'yellow';
    }

    const result = chalk[color](answer);

    console.log(result);
}
