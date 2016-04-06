import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import read from 'read';

const CONFIG_FILENAME = `.urionlinejudge.json`;

let config;

function _getConfigPath() {
  const homePath = process.env.HOME || process.env.USERPROFILE;
  return path.join(homePath, CONFIG_FILENAME);
}

function _load(reset) {
  const exists = fs.existsSync(_getConfigPath());
  let configJSON = {};

  if (exists && !reset) {
    const configPath = _getConfigPath();
    configJSON = JSON.parse(fs.readFileSync(configPath));
  }

  config = configJSON;

  return Promise.resolve();
}

function _ask(options) {
  return new Promise((resolve, reject) => {
    read(options, (error, answer) => {
      if (error) {
        reject(error);
      } else if (_.isEmpty(answer)) {
        reject({ mensage: `Can't use an empty string` });
      } else {
        resolve(answer);
      }
    });
  });
}

function _askForEmail() {
  return _ask({
    prompt: `What is your email?`
  })
  .then(answer => {
    config.email = answer;
  });
}

function _askForPassword() {
  return _ask({
    prompt: `What is your password?`,
    silent: true,
    replace: `*`
  })
  .then(answer => {
    config.password = answer;
  });
}

function _askForTemplate() {
  return _ask({
    prompt: `What is the full path for the template?`
  })
  .then(answer => {
    config.template = path.resolve(answer);
  });
}

function _askForDefaultExtension() {
  return _ask({
    prompt: `What is the default extension? (cpp/py)`
  })
  .then(answer => {
    config.extension = answer || `cpp`;
  });
}


function _save() {
  return new Promise(resolve => {
    const file = JSON.stringify(config, null, `  `);

    fs.writeFile(_getConfigPath(), file, () => {
      resolve(config);
    });
  });
}

export default class Config {
  static load(reset) {
    let save = false;

    return _load(reset)
      .then(() => {
        if (_.isEmpty(config.extension)) {
          save = true;
          return _askForDefaultExtension();
        }
      })
      .then(() => {
        if (_.isEmpty(config.template)) {
          save = true;
          return _askForTemplate();
        }
      })
      .then(() => {
        if (_.isEmpty(config.email)) {
          save = true;
          return _askForEmail();
        }
      })
      .then(() => {
        if (_.isEmpty(config.password)) {
          save = true;
          return _askForPassword();
        }
      })
      .then(() => {
        if (save) {
          return _save();
        }
      })
      .then(() => config);
  }
}
