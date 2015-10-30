import yargs from 'yargs';

let argv = yargs
    .usage('$0 <command> <params> [options]')
    .command('submit', 'submit problem to urionlinejudge', (yargs) => {
        argv = yargs
            .option('f', {
                alias: 'filepath',
                demand: true,
                description: 'Filepath of the code',
                requiresArg: true,
                type: 'string',
            })
            .option('n', {
                alias: 'number',
                demand: true,
                description: 'Number of the problem',
                requiresArg: true,
                type: 'number',
            })
            .example('$0 submit -n 1001 -f 1001.cpp')
            .example('$0 submit --number 1001 --filepath 1001.cpp')
            .help('help')
            .argv;
    })
    .command('reset', 'reset user informations')
    .demand(1)
    .version(() => {
        return require('../package.json').version;
    })
    .help('help')
    .argv;

argv.command = argv._[0];

export default argv;
