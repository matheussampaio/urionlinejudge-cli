import fs from 'fs';
import _ from 'lodash';
import read from 'read';
import config from 'config';
import User from './user';

let mUser = new User(config);

function loadEmail() {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(mUser.email)) {
            read({
                prompt: 'What is your email?',
            }, (error, answer) => {
                if (error) {
                    reject(error);
                } else {
                    mUser.email = answer;
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}

function loadPassword() {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(mUser.password)) {
            read({
                prompt: 'What is your password?',
                silent: true,
                replace: '*',
            }, (error, answer) => {
                if (error) {
                    reject(error);
                } else {
                    mUser.password = answer;
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}

function loadUsername() {
    return new Promise((resolve, reject) => {
        if (_.isEmpty(mUser.username)) {
            read({
                prompt: 'What is your username?',
            }, (error, answer) => {
                if (error) {
                    reject(error);
                } else {
                    mUser.username = answer;

                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}

function save() {
    return new Promise(resolve => {
        var file = JSON.stringify(mUser, null, '  ');

        fs.writeFile('./config/local.json', file, resolve);
    });
}

export default function loadUser(reset) {
    if (reset) {
        mUser = new User();
    }

    return loadEmail()
        .then(loadPassword)
        .then(loadUsername)
        .then(save)
        .then(() => {
            return Promise.resolve(mUser);
        });
}
