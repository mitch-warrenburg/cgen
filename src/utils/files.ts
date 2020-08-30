import { join } from 'path';
import { Set } from 'immutable';
import { basename } from 'path';
import { LocalsObject } from 'pug';
import { cat, find, mkdir, test } from 'shelljs';
import { logFatalAndTerminate, logger } from './index';
import { compilePath, compileTemplateString } from './template';

export const resolvePaths = (
  pathGlobs: Array<string>,
  regexFilters: Array<RegExp>
): Set<string> => {
  if (pathGlobs.length) {
    const findResult = find(pathGlobs) || [];
    const filteredResult = findResult.filter(
      path => !regexFilters.some(exclude => path.match(exclude))
    );
    return Set(filteredResult);
  }
  return Set();
};

export const resolveFilePath = (
  path: string,
  fileName: string,
  properties?: LocalsObject
): string | undefined => {
  const absoluteOutputPath = compilePath(path, properties);

  if (!test('-d', absoluteOutputPath)) {
    try {
      logger.info(
        'Output path does not exist. Creating directory at: %s',
        absoluteOutputPath
      );

      mkdir('-p', absoluteOutputPath);
    } catch (e) {
      logger.error(
        'Error: Unable to create directory from resolved path: %s',
        absoluteOutputPath
      );

      logFatalAndTerminate(e);
    }
  }

  return join(absoluteOutputPath, compileTemplateString(fileName, properties));
};

export const writeFile = (filePath: string, content: string) => {
  try {
    logger.info('Writing file to path %s...', filePath);
    cat(filePath).to(content);
    logger.success('Successfully generated %s.', basename(filePath));
  } catch (e) {
    logFatalAndTerminate(e);
  }
};
