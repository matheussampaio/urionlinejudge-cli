#! /usr/bin/env node

'use strict';

var fs = require('fs');
var program = require('commander');
var phantom = require('phantom');
var config = require('./config');
var Promise = require('promise');

program
    .version('0.0.1')
    .option('-p, --problem <n>', 'Submit answer for problem <n>.')
    .option('-f, --filepath <filepath>', 'Filepath with answer.')
    .parse(process.argv);

var URLS = {
    base: 'https://www.urionlinejudge.com.br',
    problemView: '/judge/pt/problems/view/',
    problemSubmit: 'https://www.urionlinejudge.com.br/judge/pt/runs/add/',
};

var _page;
var _ph;

main();

function main() {
    phantom.create(function(ph) {
        _ph = ph;

        ph.createPage(function(page) {
            _page = page;

            configPage()
                .then(login)
                .then(submitProblem)
                .then(finish);
        });
    }, {
        dnodeOpts: {
            weak: false,
        },
    });
}

function configPage() {
    return new Promise(function(resolve) {
        _page.onConsoleMessage(function(msg) {
            console.log('Phantom Console: ' + msg);
        });

        resolve();
    });
}

function login() {
    return new Promise(function(resolve) {
        _page.set('onLoadFinished', function() {
            console.log('base page loaded.');
            _page.render('1.png');
        });

        _page.open(URLS.base, function() {
            console.log('login...');

            _page.set('onLoadFinished', function() {
                console.log('logged.');
                _page.render('2.png');
                resolve();
            });

            _page.evaluate(function(config) {
                document.getElementById('UserEmail').value = config.email;
                document.getElementById('UserPassword').value = config.password;
                document.forms[0].submit();
            }, function() {

            }, config);
        });
    });
}

function submitProblem() {
    return new Promise(function(resolve) {
        _page.open(URLS.problemSubmit + program.problem, function() {
            console.log('submiting problem...');

            _page.set('onLoadFinished', function() {
                _page.render('4.png');

                var file = fs.readFileSync(program.filepath, 'utf-8');

                _page.evaluate(function(file) {
                    editor.getSession().setValue(file);
                    $('.send-submit').click();

                }, function() {

                    setTimeout(function() {
                        _page.render('6.png');
                        resolve();
                    }, 1000);

                }, file);

            });
        });
    });
}

function finish() {
    return new Promise(function(resolve) {
        console.log('finishing...');
        _page.render('10.png', function() {
            _ph.exit();
            resolve();
        });
    });
}
