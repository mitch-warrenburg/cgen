import winston from 'winston';
import { exit } from 'shelljs';
import { format, TransformableInfo } from 'logform';
import chalk, { Chalk } from 'chalk';

const LEVEL = Symbol.for('level');

const cliFormat = format.cli({ colors: { info: 'blue' } });

const loggerInfo: Readonly<TransformableInfo> = {
  [LEVEL]: 'info',
  level: 'info',
  message: '',
};

export const logformInfoConsoleLog = (message: string) =>
  console.log(cliFormat.transform({ ...loggerInfo, message }, { all: true }));

export const errorFormat = format.errors({ stack: true });

const logformErrorConsoleLog = (error: Error) => {
  console.log(
    errorFormat.transform({
      [LEVEL]: 'error',
      level: 'error',
      message: 'motherfucker!',
    })
  );
};

export const winstonLogger = winston.createLogger({
  format: format.combine(
    format.cli(),
    format.timestamp(),
    format.label({ label: 'fucknutz' })
  ),
  levels: winston.config.npm.levels,
  exitOnError: true,
  handleExceptions: true,
  exceptionHandlers: [new winston.transports.File({ filename: 'cgen-error.log' })],
  transports: [new winston.transports.Console()],
});

winstonLogger.on('finish', info => {
  console.log('finished logging!', info);
});

// format.combine(
//   format.cli(),
//   format.timestamp(),
//   format.align(),
//   format.label({ label: 'right meow!' }),
//   format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
// );

const errorChalk: Chalk = chalk.red;
const infoChalk: Chalk = chalk.blueBright;
const successChalk: Chalk = chalk.bold.greenBright;

export const createLogger = (chalk: Chalk) => (...messages: unknown[]) => {
  console.log(chalk(messages));
};

export const info = createLogger(infoChalk);
export const error = createLogger(errorChalk);
export const success = createLogger(successChalk);
export const logErrorAndExit = (error: Error, ...messages: unknown[]) => {
  if (error instanceof Error) {
    chalk`
    {red.magenta Cgen process exiting with status code: (1)};
	  {red.bold.underline Error:} {red ${error.name}}
	  
	  {red ${error.message}}
	  
	  {red ${error.stack.blink()}}
`;
  }
  exit(1);
};

console.log();
