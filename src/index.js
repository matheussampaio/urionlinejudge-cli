#! /usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import checkUpdate from 'check-update';

import CLI from './CLI';
import loadUser from './loadUser';
import Analytics from './Analytics';
import URIOnlineJudge from './URIOnlineJudge';
import { name, version } from '../package.json';

main();

function main() {
  // always check for updates
  checkForUpdate()
    .then(() => command());
}

function command() {
  const commands = {
    reset: reset,
    submit: submit,
  };

  commands[CLI.command]()
    // flush every analytics
    .then(() => {
      return Analytics.flush();
    })
    // make sure the process is finished.
    .then(process.exit)
    .catch(() => {
      console.log('here');
    });
}

/**
 * Reset user informations
 */
function reset() {
  return loadUser(true)
    .then((user) => {
      console.log(`[*] ${chalk.green('Success:')} ${user.email}`);
    })
    .catch((error) => {
      console.error(`\n\n[*] ${chalk.red(error)}`);
    });
}

/**
 * Load user and submit a problem to URI Online Judge Website
 */
function submit() {
  const problemFile = fs.readFileSync(CLI.filepath, 'utf-8');

  return loadUser()
    // submit problem to the uri online judge website
    .then(user => {
      return URIOnlineJudge.submit({
        email: user.email,
        password: user.password,
        problem: CLI.number,
        file: problemFile,
      });
    })
    // send success analytics
    .then((answer) => {
      return Analytics.submit({
        problem: CLI.number,
        result: answer,
      });
    })
    // send error analytics
    .catch((error) => {
      return Analytics.error({
        command: 'submit',
        problem: CLI.number,
        error: error,
      });
    });
}

/**
 * Check for CLI updates (on npm) and print some warning on the command line.
 */
function checkForUpdate() {
  return new Promise(resolve => {
    checkUpdate({
      packageName: name,
      packageVersion: version,
      isCLI: true,
    }, (err, latestVersion, defaultMessage) => {
      if (!err) {
        console.log(defaultMessage + '\n');
      }
      resolve();
    });
  });
}
