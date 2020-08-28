#!/usr/bin/env node

/* tslint:disable */
/* @ts-ignore-start */
import { Command } from 'commander';
import chalk, { Chalk } from 'chalk';
import pkg from '../../package.json';

export const info: Chalk = chalk.blueBright;
export const error: Chalk = chalk.bold.redBright;
export const success: Chalk = chalk.bold.greenBright;
const program = new Command('cgen');

program
  .version(pkg.version)
  .option('-C, --chdir <path>', info('change the working directory').toString())
  .option('-c, --config <path>', info('set config path. defaults to ./deploy.conf'))
  .option('-T, --no-tests', info('ignore test hook'));

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  // .requiredOption('-c, --cheese <type>', 'pizza must have cheese')
  .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .action(function (env, options) {
    const mode = options.setup_mode || 'normal';
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use')
  .action(function (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  })
  .on('--help', function () {
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
  });

program.parse(process.argv);
/* @ts-ignore-end */
