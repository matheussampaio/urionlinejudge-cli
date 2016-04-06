#! /usr/bin/env node

require(`babel-polyfill`);

import fs from 'fs';
import path from 'path';
import checkUpdate from 'check-update';

import CLI from './cli';
import Log from './utils/log';
import Config from './config';
import Analytics from './utils/analytics';
import URIOnlineJudge from './uri/uri-online-judge';
import URIOnlineJudgeURL from './uri/uri-online-judge-urls';
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
    init
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
  return Config.load(true)
    .then((config) => {
      Log.success(`Email: ${config.email}`, `Template: ${config.template}`);
    })
    .catch((error) => {
      Log.error(error);
    });
}

/**
 * Load user and submit a problem to URI Online Judge Website
 */
function submit() {
  const problemFile = fs.readFileSync(CLI.filepath, `utf-8`);
  const ext = path.extname(CLI.filepath);
  const number = CLI.number ? CLI.number : path.basename(CLI.filepath, ext);

  return Config.load()
    // submit problem to the uri online judge website
    .then(config => URIOnlineJudge.submit({
      email: config.email,
      password: config.password,
      problem: parseInt(number, 10),
      file: problemFile,
      language: CLI.language
    }))
    // send success analytics
    .then((answer) => Analytics.submit({
      problem: number,
      result: answer
    }))
    // send error analytics
    .catch((error) => Analytics.error({
      command: `submit`,
      problem: number,
      error: error.stack ? error.stack : error
    }).then(() => {
      throw new Error(error);
    }));
}

/**
 * Init a question from the URI Online Judge Website
 */
function init() {
  const force = CLI.force;
  const problemNumber = CLI.number;
  const injectValue = `urionlinejudge::description`;

  return Config.load()
    .then(config => {
      const template = CLI.template ? CLI.template : config.template;

      const extname = path.extname(template);
      const outputFilepath = path.join(CLI.output, `${problemNumber}${extname}`);
      const templateFile = fs.readFileSync(template, `utf-8`);

      return checkTemplate({
        force,
        injectValue,
        templateFile,
        problemNumber,
        outputFilepath
      })
      .then(() => {
        const desc = URIOnlineJudgeURL.problemView + problemNumber;
        const outputFile = templateFile.replace(injectValue, desc);

        fs.writeFileSync(outputFilepath, outputFile);

        Log.success(`Problem init: ${outputFilepath}`);
      });
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
  force
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
        `Make sure that your template contains '${injectValue}'.`
      ]);
      // reject if force is false and file already exists
    } else if (!force && exists) {
      reject([
        `This file ${outputFilepath} already exists. Use -f or --force if you want to overwrite:`,
        `urionlinejudge fetch -f -n ${problemNumber} -t ${templateFilepath} -o ${outputFilepath}`
      ]);
    } else {
      resolve();
    }
  });
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
      isCLI: true
    }, (err, latestVersion, defaultMessage) => {
      if (!err && version !== latestVersion) {
        console.log(`${defaultMessage}\n`);
      }
      resolve();
    });
  });
}
