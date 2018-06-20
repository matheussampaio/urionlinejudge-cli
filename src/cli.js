const yargs = require('yargs')

const { LANGUAGES } = require('./utils/constants')
const { version } = require('../package.json')

const argv = yargs
  .usage('$0 <command> <params> [options]')
  .command('submit <filepath> [number]', 'submit problem to urionlinejudge', {
    l: {
      alias: 'language',
      description: 'Language',
      choices: Object.values(LANGUAGES),
      requiresArg: true,
      type: 'string'
    }
  })
  .command('fetch <number>', 'Fetch a problem description', {
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
    },
    f: {
      alias: 'force',
      demand: false,
      default: false,
      description: 'Overrides existing files',
      type: 'bollean'
    }
  })
  .command('reset', 'reset user informations')
  .demandCommand(1)
  .version(version)
  .help('help')
  .argv

argv.command = argv._[0]

module.exports = argv
