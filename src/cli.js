import yargs from 'yargs';

const argv = yargs
  .usage(`$0 <command> <params> [options]`)
  .command(`submit <filepath> [number]`, `submit problem to urionlinejudge`, {
    language: {
      description: `Language`,
      default: `python3`,
      choices: [`c`, `c++`, `c#`, `java`, `python`, `python3`, `ruby`],
      requiresArg: true,
      type: `string`
    }
  })
  .command(`init <number> [force]`, `Fetch a problem description`, {
    t: {
      alias: `template`,
      demand: false,
      description: `Filepath of the template`,
      requiresArg: true,
      type: `string`
    },
    o: {
      alias: `output`,
      demand: false,
      default: `.`,
      description: `Path to save the file`,
      requiresArg: true,
      type: `string`
    }
  })
  .command(`reset`, `reset user informations`)
  .demand(1)
  .version(() => require(`../package.json`).version)
  .help(`help`)
  .argv;

argv.command = argv._[0];

export default argv;
