import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import read from 'read';

import User from './model/User';

const CONFIG_FILENAME = '.urionlinejudge.json';
let user;

function _getConfigPath() {
  const homePath = process.env.HOME || process.env.USERPROFILE;
  return path.join(homePath, CONFIG_FILENAME);
}

function _loadUser(reset) {
  const exists = fs.existsSync(_getConfigPath());
  let userConfigJSON = {};

  if (exists && !reset) {
    const userConfigPath = _getConfigPath();
    userConfigJSON = JSON.parse(fs.readFileSync(userConfigPath));
  }

  user = new User(userConfigJSON);

  return Promise.resolve();
}

function _ask(options) {
  return new Promise((resolve, reject) => {
    read(options, (error, answer) => {
      if (error) {
        reject(error);
      } else if (_.isEmpty(answer)) {
        reject({mensage: `Can't use an empty string`});
      } else {
        resolve(answer);
      }
    });
  });
}

function _askForEmail() {
  return _ask({
    prompt: 'What is your email?',
  })
        .then(answer => {
          user.email = answer;
        });
}

function _askForPassword() {
  return _ask({
    prompt: 'What is your password?',
    silent: true,
    replace: '*',
  })
        .then(answer => {
          user.password = answer;
        });
}

function _save() {
  return new Promise(resolve => {
    const file = JSON.stringify(user, null, '  ');

    fs.writeFile(_getConfigPath(), file, () => {
      resolve(user);
    });
  });
}

export default function loadUser(reset) {
  let save = false;

  return _loadUser(reset)
        .then(() => {
          if (_.isEmpty(user.email)) {
            save = true;
            return _askForEmail();
          }
        })
        .then(() => {
          if (_.isEmpty(user.password)) {
            save = true;
            return _askForPassword();
          }
        })
        .then(() => {
          if (save) {
            return _save();
          }
        })
        .then(() => user);
}
