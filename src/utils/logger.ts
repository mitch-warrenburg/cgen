import { Signale } from 'signale';
import { blue, colors, green, orange, red, yellow } from '../constants';
import { exit } from 'shelljs';

const _logger: Readonly<Signale> = new Signale();

const resolveVarArgs = (...args: unknown[]): unknown[] | undefined => {
  return args.length ? args : undefined;
};

export const logger = {
  error: (message: unknown, ...args: unknown[]) => {
    _logger.error(red(message), resolveVarArgs(args));
  },
  fatal: (message: unknown, ...args: unknown[]) => {
    if (message instanceof Error) {
      _logger.fatal(message);
    } else {
      _logger.fatal(red.bold(message), resolveVarArgs(args));
    }
  },
  warn: (message: unknown, ...args: unknown[]) => {
    _logger.warn(yellow(message), resolveVarArgs(args));
  },
  info: (message: unknown, ...args: unknown[]) => {
    _logger.info(blue(message), resolveVarArgs(args));
  },
  success: (message: unknown, ...args: unknown[]) => {
    _logger.success(green.bold(message), resolveVarArgs(args));
  },
  complete: (message: unknown, ...args: unknown[]) => {
    _logger.complete(green(message), resolveVarArgs(args));
  },
  pending: (message: unknown, ...args: unknown[]) => {
    _logger.pending(orange(message), resolveVarArgs(args));
  },
};

export const printTerminalColors = () => {
  Object.entries(colors).forEach(([name, chalkColor], i) =>
    console.log(`${i} ---> ${chalkColor(name)}`)
  );
};

export const logAndExitStatusOne = (error: Error) => {
  logger.fatal(error);
  exit(1);
};

export default logger;
