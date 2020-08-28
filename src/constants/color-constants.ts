import { TerminalColorsDefinitions } from '../types';
import chalk, { Chalk } from 'chalk';

export const grey: Chalk = chalk.hex('#888888');
export const darkGrey: Chalk = chalk.hex('#666666');
export const red: Chalk = chalk.hex('#ff8278');
export const green: Chalk = chalk.hex('#bde077');
export const yellow: Chalk = chalk.hex('#eadc84');
export const purple: Chalk = chalk.hex('#dd91f3');
export const orange: Chalk = chalk.hex('#ffc178');
export const blue: Chalk = chalk.hex('#77bee0');
export const foreground: Chalk = chalk.hex('#dcdccc');
export const background: Chalk = chalk.hex('#575757');

export const colors: TerminalColorsDefinitions = {
  grey,
  darkGrey,
  red,
  green,
  yellow,
  purple,
  orange,
  blue,
  foreground,
  background,
};

export default colors;
