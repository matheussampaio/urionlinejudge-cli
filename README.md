[![npm version](https://badge.fury.io/js/urionlinejudge-cli.svg)](https://badge.fury.io/js/urionlinejudge-cli)
[![Build Status](https://travis-ci.org/matheussampaio/urionlinejudge-cli.svg?branch=master)](https://travis-ci.org/matheussampaio/urionlinejudge-cli)
[![Dependency Status](https://david-dm.org/matheussampaio/urionlinejudge-cli.svg)](https://david-dm.org/matheussampaio/urionlinejudge-cli)
[![devDependency Status](https://david-dm.org/matheussampaio/urionlinejudge-cli/dev-status.svg)](https://david-dm.org/matheussampaio/urionlinejudge-cli#info=devDependencies)

# URI Online Judge - CLI

The URI Online Judge command line utility makes it easy to submit problems, wait for the solution and fetch new problems via command line!

**What is a command line utility?**

A command line utility is one to be used from a shell (or commonly known as a Terminal). It receives input from this shell, and reports its output in the same shell.

# Installing

```bash
$ npm install -g phantomjs urionlinejudge-cli
```

*Note: For a global install of `-g urionlinejudge-cli`, OSX/Linux users may need to prefix the command with `sudo` or can setup [proper file permissions on OSX for npm](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/) to install without `sudo`. *

**IMPORTANT:** For now the CLI is not working on OSX (see [issue #5](/../../issues/5)).

# Commands

## `submit`
You can submit a problem solution to the [URI Online Judge](1).

#### Options

| Option                               | Default  | Description        |
|--------------------------------------|----------|--------------------|
| `-n, --number [number]` **required** |          | Problem number.    |
| `-f, --filepath [path]` **required** |          | Solution filepath. |

#### Example

```bash
$ urionlinejudge submit -n 1001 -f 1001.cpp
# or
$ urionlinejudge submit --number 1001 --filepath 1001.cpp
```



## `fetch`
You can fetch a problem description from the [URI Online Judge](1) and populate a template file with that description.

You have to add `// urionlinejudge::description` to your template.

##### Options

| Option                               | Default | Description                     |
|--------------------------------------|---------|---------------------------------|
| `-n, --number [number]` **required** |         | Problem number.                 |
| `-t, --template [path]` **required** |         | Template filepath.              |
| `-o, --output [path]`                | `.`     | File output path.               |
| `-f, --force`                        |         | Force overwrite existing files. |


#### Example

You create one template and add `// urionlinejudge::description` at any place:
```cpp
#include <iostream>

using namespace std;

// urionlinejudge::description

int main()
{
    // work here

    return 0;
}
```

Then you execute the `fetch` command passing your template path:

```bash
$ urionlinejudge fetch -n 1001 -t ../templates/template.cpp
# or
$ urionlinejudge fetch -n 1001 -t ../templates/template.cpp -f
# or
$ urionlinejudge fetch -n 1001 -t ../templates/template.cpp -o ../solutions/folder
```

Then the CLI will fetch the problem description and create this file for you:
```cpp
#include <iostream>

using namespace std;

/*
 * Title:
 * Extremely Basic
 *
 * Timelimit: 1
 *
 * Description:
 * Read 2 variables, named A and B and make the sum of these two variables,
 * assigning its result to the variable X. Print X as shown below. Print
 * endline after the result otherwise you will get “Presentation Error”.
 *
 * Input:
 * The input file will contain 2 integer numbers.
 *
 * Output:
 * Print X according to the following example, with a blank space before and
 * after the equal signal.
 *
 */

 int main()
 {
     // work here

     return 0;
 }
 ```



## `reset`
You can reset your information.

#### Example

```
$ urionlinejudge reset
What is your email? matheus1401@gmail.com
What is your password? *******

[*] Success:
[*] Email: matheus1401@gmail.com
```



# Developing and Contributing
We'd love to get contributions from you! For a quick guide to getting your system setup for developing take a look at our [Quickstart Guide](https://github.com/matheussampaio/urionlinejudge-cli/blob/master/QUICKSTART.md). Once you are up and running, take a look at the [Contribution Documents](https://github.com/matheussampaio/urionlinejudge-cli/blob/master/CONTRIBUTING.md) to see how to get your changes merged in.

# License
See [LICENSE](https://github.com/matheussampaio/urionlinejudge-cli/blob/master/LICENSE) file.

[1]: https://www.urionlinejudge.com.br
