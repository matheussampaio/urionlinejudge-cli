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
  return loadUser(true)
        .then((user) => {
          console.log(`[*] ${chalk.green('Success:')} ${user.email}`);
        })
        .catch((error) => {
          console.error(`\n[*] ${chalk.red('Failed:')} ${error.mensage}`);
        });
}

function submit() {
  const problemfile = fs.readFileSync(cli.filepath, 'utf-8');
  const browserWrapper = new BrowserWrapper();
  const results = {};

  return loadUser()
        .then(user => {
          return browserWrapper
                .init({progress: 'Submitting'})
                .createPhantom()
                .createPage()
                .open({url: URLS.login})
                .login({email: user.email, password: user.password})
                .open({url: URLS.problemSubmit + cli.number})
                .submit({file: problemfile})
                .open({url: URLS.problemSubmissions})
                .waitForAnswer({number: cli.number})
                .then(answer => {
                  results.answer = answer;
                })
                .exit()
                .start();
        })
        .then(() => {
          _showResult(results.answer);
        })
        .catch((error) => {
          browserWrapper.progress.tick(1000);
          console.log(`\n[*] ${chalk.red('Failed:')} ${error}`);
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

  const result = chalk[color](`${answer}: ${cli.number}`);

  console.log(`[*] ${result}`);
}
