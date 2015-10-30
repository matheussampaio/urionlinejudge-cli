#! /usr/bin/env node

import fs from 'fs';
import cli from './cli';
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
                .init({progress: 'Submiting'})
                .createPhantom()
                .createPage()
                .open({url: URLS.base})
                .login({email: user.email, password: user.password})
                .open({url: URLS.problemSubmit + cli.number})
                .submit({file: problemfile})
                .exit()
                .start();
        });
}
