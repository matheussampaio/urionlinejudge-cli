[![Build Status](https://travis-ci.org/matheussampaio/urionlinejudge-cli.svg?branch=master)](https://travis-ci.org/matheussampaio/urionlinejudge-cli)
[![MIT License](https://img.shields.io/npm/l/validate-commit-msg.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/matheussampaio/urionlinejudge-cli.svg)](https://david-dm.org/matheussampaio/urionlinejudge-cli)
[![devDependency Status](https://david-dm.org/matheussampaio/urionlinejudge-cli/dev-status.svg)](https://david-dm.org/matheussampaio/urionlinejudge-cli#info=devDependencies)

[![NPM](https://nodei.co/npm/urionlinejudge-cli.png?downloads=true)](https://nodei.co/npm/urionlinejudge-cli/)
# URI Online Judge - CLI

## Installing

```bash
$ npm install -g phantomjs urionlinejudge-cli
```

*Note: For a global install of `-g urionlinejudge-cli`, OSX/Linux users may need to prefix the command with `sudo` or can setup [proper file permissions on OSX for npm](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/) to install without `sudo`. *

**IMPORTANT:** For now the CLI is not working on OSX (see [issue #5](/../../issues/5)).

## Submit question
```bash
$ urionlinejudge submit --number 1001 --filepath 1001.cpp
```

or

```bash
$ urionlinejudge submit -n 1001 -f 1001.cpp
```

## Reconfigure user information
```bash
$ urionlinejudge reset
```

## Developing and Contributing
We'd love to get contributions from you! For a quick guide to getting your system setup for developing take a look at our [Quickstart Guide](https://github.com/matheussampaio/urionlinejudge-cli/blob/master/QUICKSTART.md). Once you are up and running, take a look at the [Contribution Documents](https://github.com/matheussampaio/urionlinejudge-cli/blob/master/CONTRIBUTING.md) to see how to get your changes merged in.

## License
See [LICENSE](https://github.com/matheussampaio/urionlinejudge-cli/blob/master/LICENSE) file.
