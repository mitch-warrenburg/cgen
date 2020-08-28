import { resolve } from 'path';
import { logger } from '../utils';
import pug, { LocalsObject, Options } from 'pug';
import { logAndExitStatusOne } from './logger';

export const compilePath = (path: string, properties?: LocalsObject) => {
  const absolutePath = resolve(path);
  try {
    return properties ? compileTemplateString(absolutePath, properties) : absolutePath;
  } catch (e) {
    logger.error('Error: Unable to compile path from provided template string: %s', path);
    logAndExitStatusOne(e);
  }
};

export const compileTemplateString = (template: string, properties = {}) => {
  try {
    return pug.render(`|${template}`, properties);
  } catch (e) {
    logger.error('Error: Unable to compile provided template string: %s', template);
    logAndExitStatusOne(e);
  }
};

export const compileTemplateFile = (
  templatePath: string,
  properties: LocalsObject,
  pugOptions?: Options
) => {
  try {
    return pug.compileFile(templatePath, pugOptions)(properties);
  } catch (e) {
    logger.error('Error: Unable to compile provided tempate file. Path:', templatePath);
    logAndExitStatusOne(e);
  }
};
