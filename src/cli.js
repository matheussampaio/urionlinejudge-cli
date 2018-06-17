const yargs = require('yargs')

const { version } = require('../package.json')

const argv = yargs
  .usage('$0 <command> <params> [options]')
  .command('submit <filepath> [number]', 'submit problem to urionlinejudge', {
    l: {
      alias: 'language',
      description: 'Language',
      default: 'python3',
      choices: ['c', 'c++', 'c#', 'java', 'python', 'python3', 'ruby',
        'scala', 'js', 'java8', 'go', 'c99', 'kotlin', 'c++17' ],
      requiresArg: true,
      type: 'string'
    }
  })
  .command('init <number> [force]', 'Fetch a problem description', {
    t: {
      alias: 'template',
      demand: false,
      description: 'Filepath of the template',
      requiresArg: true,
      type: 'string'
    },
    o: {
      alias: 'output',
      demand: false,
      default: '.',
      description: 'Path to save the file',
      requiresArg: true,
      type: 'string'
    }
  })
  .command('reset', 'reset user informations')
  .demandCommand(1)
  .version(version)
  .help('help')
  .argv

argv.command = argv._[0]

module.exports = argv
