# Quick Start to Developing on URI Online Judge CLI

Before diving into the code, you should first take the time to make sure you have an environment where you can run the URI Online Judge CLI as a developer. In a nutshell you need: the URI Online Judge CLI codebase, nodejs & npm, and dependencies. Once you've got all of that in place you can make sure that you have a working development system by running the URI Online Judge CLI spec tests.

## The URI Online Judge CLI Codebase
In order to contribute to URI Online Judge CLI you'll need to have a github account. Once you have your account, fork the matheussampaio/urionlinejudge-cli repo, and clone it onto your local machine. The [github docs have a good explanation](https://help.github.com/articles/fork-a-repo) of how to do all of this.

## nodejs & npm
URI Online Judge CLI needs nodejs for work and npm for dependencies management, so if you don't have Node installed on your environment, please go to [nodejs website](https://nodejs.org/) and installed the last version.

PS.: I still don't tested the CLI on Node v4 nor v5, so if you encounter some problem, open a PR.

## Dependencies
Make sure you have all dependencies installed. This should be as simple as:

```
$ cd path/to/urionlinejudge-cli
$ npm install -g gulp
$ npm install
```

Once this is done, you can interact with the CLI through Gulp using `gulp <task>`.

For example to run the tests:

```
$ gulp test
```

To build the project:

```
$ gulp build
```

To continuous build the project (util for developing):

```
$ gulp debug
```

## Execute your URI Online Judge CLI version
You can execute your version of the CLI with:

```
$ cd path/to/urionlinejudge-cli
$ node dist/index.js -n 1001 -f ../files/1001.cpp
```

or

```
$ cd path/to/urionlinejudge-cli
$ npm link
$ cd ../files
$ urionlinejudge -n 1001 -f 1001.cpp
```

## Missing Something?
Did we missed (or mistyped) something? Open an issue and send us a PR! :smile:
