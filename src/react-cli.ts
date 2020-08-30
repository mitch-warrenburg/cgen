#!/usr/bin/env node
import { program } from 'commander';

const cli = () => {
  program.version('1.0.1');

  program
    .command('cgen <parameters...>')
    .option('-O, --overwrite', 'Overwrite file if it exists.')
    .option('-F, --fail-fast', 'Terminate process immediately on failure')
    .description('wow omg')
    .action((parameters, options) => {
      console.log(options.overwrite);
    })
    .on('--help', function () {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ deploy exec sequential');
      console.log('  $ deploy exec async');
    });

  program.parse(process.argv);
};

console.log('about to run');

cli();
