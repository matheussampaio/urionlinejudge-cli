import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import read from 'read';
import User from './user';

let CONFIG_FILENAME = '.urionlinejudge.json';

export default function loadUser(reset) {
    let config = {};

    if (!reset) {
        config = loadConfig();
    }

    return loadEmail(new User(config))
        .then(loadPassword)
        .then(loadUsername)
        .then(save);
}

function loadConfig() {
    let exists = fs.existsSync(getConfigPath());
    let config = {};

    if (exists) {
        config = JSON.parse(fs.readFileSync(getConfigPath()));
    }

    return config;
}

function loadEmail(user) {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(user.email)) {
            read({  prompt: 'What is your email?'}, (error, answer) => {
                if (error) {
                    reject(error);
                } else {
                    user.email = answer;

                    resolve(user);
                }
            });
        } else {
            resolve(user);
        }
    });
}

function loadPassword(user) {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(user.password)) {
            read({
                prompt: 'What is your password?',
                silent: true,
                replace: '*',
            }, (error, answer) => {
                if (error) {
                    reject(error);
                } else {
                    user.password = answer;

                    resolve(user);
                }
            });
        } else {
            resolve(user);
        }
    });
}

function loadUsername(user) {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(user.username)) {
            read({ prompt: 'What is your username?' }, (error, answer) => {
                if (error) {
                    reject(error);
                } else {
                    user.username = answer;

                    resolve(user);
                }
            });
        } else {
            resolve(user);
        }
    });
}

function save(user) {
    return new Promise(resolve => {
        let file = JSON.stringify(user, null, '  ');

        fs.writeFile(getConfigPath(), file, () => {
            resolve(user);
        });
    });
}

function getUserHome() {
    return process.env.HOME || process.env.USERPROFILE;
}

function getConfigPath() {
    return path.join(getUserHome(), CONFIG_FILENAME);
}
