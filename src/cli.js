import yargs from 'yargs';

const argv = yargs
  .usage('$0 <command> <params> [options]')
  .command('submit', 'submit problem to urionlinejudge', {
    f: {
      alias: 'filepath',
      demand: false,
      description: 'Filepath of the code',
      requiresArg: true,
      type: 'string'
    },
    n: {
      alias: 'number',
      demand: true,
      description: 'Number of the problem',
      requiresArg: true,
      type: 'number'
    }
  })
  .command('fetch', 'Fetch a problem description', (args) => {
    return args
      .option('n', {
        alias: 'number',
        demand: true,
        description: 'Number of the problem',
        requiresArg: true,
        type: 'number'
      })
      .option('t', {
        alias: 'template',
        demand: false,
        description: 'Filepath of the template',
        requiresArg: true,
        type: 'string'
      })
      .option('o', {
        alias: 'output',
        demand: false,
        default: '.',
        description: 'Path to save the file',
        requiresArg: true,
        type: 'string'
      })
      .option('f', {
        alias: 'force',
        demand: false,
        default: false,
        description: 'Force overwrite existing files.',
        type: 'boolean'
      })
      .help('help')
      .argv;
  })
  .command('reset', 'reset user informations')
  .demand(1)
  .version(() => require('../package.json').version)
  .help('help')
  .argv;

argv.command = argv._[0];

export default argv;
