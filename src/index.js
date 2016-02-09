#! /usr/bin/env node

require('babel-polyfill');

import fs from 'fs';
import path from 'path';
import checkUpdate from 'check-update';

import CLI from './cli';
import Log from './utils/log';
import loadUser from './load-user';
import Analytics from './utils/analytics';
import URIOnlineJudge from './uri/uri-online-judge';
import { name, version } from '../package.json';

main();

function main() {
  // always check for updates
  checkForUpdate()
    .then(() => command());
}

function command() {
  const commands = {
    reset,
    submit,
    fetch,
  };

  if (commands[CLI.command] !== undefined) {
    commands[CLI.command]()
      // flush every analytics
      .then(() => Analytics.flush())
      .catch((error) => {
        Log.error(error);
      })
      // make sure the process is finished.
      .then(process.exit);
  } else {
    Log.error(`Command '${CLI.command}' not found.`);
  }
}

/**
 * Reset user informations
 */
function reset() {
  return loadUser(true)
    .then((user) => {
      Log.success(`Email: ${user.email}`);
    })
    .catch((error) => {
      Log.error(error);
    });
}

/**
 * Load user and submit a problem to URI Online Judge Website
 */
function submit() {
  const problemFile = fs.readFileSync(CLI.filepath, 'utf-8');

  return loadUser()
    // submit problem to the uri online judge website
    .then(user => URIOnlineJudge.submit({
      email: user.email,
      password: user.password,
      problem: CLI.number,
      file: problemFile,
    }))
    // send success analytics
    .then((answer) => Analytics.submit({
      problem: CLI.number,
      result: answer,
    }))
    // send error analytics
    .catch((error) => Analytics.error({
      command: 'submit',
      problem: CLI.number,
      error: error.stack ? error.stack : error,
    }).then(() => {
      throw new Error(error);
    }));
}

/**
 * Fetch a question from the URI Online Judge Website
 */
function fetch() {
  const force = CLI.force;
  const problemNumber = CLI.number;
  const injectValue = `// urionlinejudge::description`;

  const extname = path.extname(CLI.template);
  const outputFilepath = path.join(CLI.output, `${problemNumber}${extname}`);

  const templateFile = fs.readFileSync(CLI.template, 'utf-8');

  return checkTemplate({
    force,
    injectValue,
    templateFile,
    problemNumber,
    outputFilepath,
  })
  .then(() => URIOnlineJudge.fetch({
    problemNumber,
  }))
  .then(problem => injectDescription({
    problem,
    injectValue,
    templateFile,
    problemNumber,
    outputFilepath,
  }))
  .then(() => {
    Log.success(`Problem fetched: ${outputFilepath}`);
  });
}

/**
 * Check if template already exists and reject if force is false.
 * Check if template contains INJECT_VALUE, reject if don't.
 */
function checkTemplate({
  injectValue,
  templateFile,
  templateFilepath,
  outputFilepath,
  problemNumber,
  force,
}) {
  return new Promise((resolve, reject) => {
    let exists = true;

    try {
      fs.accessSync(outputFilepath);
    } catch (e) {
      exists = false;
    }

    // Verify if template contains INJECT_VALUE
    if (templateFile.indexOf(injectValue) === -1) {
      reject([
        `Can't find the inject string.`,
        `Make sure that your template contains '${injectValue}'.`,
      ]);
      // reject if force is false and file already exists
    } else if (!force && exists) {
      reject([
        `This file ${outputFilepath} already exists. Use -f or --force if you want to overwrite:`,
        `urionlinejudge fetch -f -n ${problemNumber} -t ${templateFilepath} -o ${outputFilepath}`,
      ]);
    } else {
      resolve();
    }
  });
}

function injectDescription({
  problem,
  injectValue,
  outputFilepath,
  templateFile,
}) {
  return new Promise(resolve => {
    const desc = [
      `/*`,
      ` * Title:`,
      `${prepareString(problem.title)}`,
      ` *`,
      `${prepareString(problem.timelimit)}`,
      ` *`,
      ` * Description:`,
      `${prepareString(problem.description)}`,
      ` *`,
      ` * Input:`,
      `${prepareString(problem.input)}`,
      ` *`,
      ` * Output:`,
      `${prepareString(problem.output)}`,
      ` *`,
      ` */`,
    ].join('\n');

    const outputFile = templateFile.replace(injectValue, desc);

    fs.writeFileSync(outputFilepath, outputFile);

    resolve();
  });
}

function prepareString(str) {
  const words = str.split(' ');
  const start = ` * `;
  let output = ``;
  let newline = start;

  for (const w of words) {
    if (newline.length + w.length >= 79) {
      output += `${newline.trimRight()}\n`;
      newline = start;
    }

    newline += `${w} `;
  }

  output += newline.trimRight();

  return output;
}

/**
 * Check for CLI updates (on npm) and print some warning on the command line.
 */
function checkForUpdate() {
  return new Promise(resolve => {
    if (process.env.DEBUG) {
      return resolve();
    }

    checkUpdate({
      packageName: name,
      packageVersion: version,
      isCLI: true,
    }, (err, latestVersion, defaultMessage) => {
      if (!err && version !== latestVersion) {
        console.log(`${defaultMessage}\n`);
      }
      resolve();
    });
  });
}
