import { resolve } from 'path';
import pug, { LocalsObject, Options } from 'pug';
import { error } from 'shelljs';
import { logErrorAndExit } from './logging';

export const compilePath = (path: string, properties?: LocalsObject) => {
  const absolutePath = resolve(path);
  return properties ? compileTemplateString(absolutePath, properties) : absolutePath;
};

export const compileTemplateString = (template: string, properties = {}) => {
  try {
    return pug.render(`|${template}`, properties);
  } catch (e) {
    logErrorAndExit('Unable to compile provided tempate file. Path:', templatePath);
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
    logErrorAndExit(
      'Error: Unable to compile provided tempate file. Path:',
      templatePath
    );
  }
};
