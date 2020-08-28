import { JobConfig } from '../types';
import { basename, join } from 'path';
import { mkdir, test } from 'shelljs';
import pug, { LocalsObject } from 'pug';
import {
  logger,
  mergeDeep,
  compilePath,
  compileTemplateString,
  logAndExitStatusOne,
} from '../utils';

// const emptyConig: Readonly<JobConfig> = { fileNames: {} };

// const getJobConfig = (
//   job: JobConfig | ProjectArchetypeName = 'react-ts',
//   baseJob: JobConfig = emptyConig
// ): JobConfig => {
//   const archetype = jobArchetypes[job as string];
//   return archetype ? mergeDeep(baseJob, archetype) : mergeDeep(baseJob, job);
// };

// export const entry = (jobName = '', config: CgenConfig = {}) => {
//   const { base, ...jobs } = config;
//
//   if (!jobs[jobName]) {
//     logger.fatal(new Error(NO_JOBS_MSG));
//     exit(1);
//   }
//   const jobConfig = getJobConfig(jobs[jobName], base);
//   generateContent('fc', properties, jobConfig);
// };

export const generateContent = (
  // logOutput = false,
  template: string,
  jobConfig: JobConfig,
  properties: LocalsObject
) => {
  const {
    fileNames,
    pugOptions,
    outPath = './src',
    defaultProperties = {},
    templatesDir = './templates',
  } = jobConfig;

  const mergedProperties = mergeDeep(defaultProperties, properties);
  const fileName = fileNames[template];
  const outoutFilePath = getPath(outPath, fileName, mergedProperties);
  const templatesDirPath = getPath(templatesDir, `${template.replace('.pug', '')}.pug`);

  if (!test('-d', outoutFilePath)) {
    const content = pug.compileFile(templatesDirPath, pugOptions)(properties);
    const contentStdr = `
      ${content}
    `;
    logger.info(`Generated content for %s. ${contentStdr}`, basename(templatesDirPath));
  }
};

const getPath = (path: string, fileName: string, properties?: LocalsObject) => {
  const absoluteOutputPath = compilePath(path, properties);

  if (!test('-d', absoluteOutputPath)) {
    logger.info(
      'Output path does not exist. Creating directory at: %s',
      absoluteOutputPath
    );
    try {
      mkdir('-p', absoluteOutputPath);
    } catch (e) {
      logger.error(
        'Error: Unable to create directory from resolved path: %s',
        absoluteOutputPath
      );
      logAndExitStatusOne(e);
    }
  }

  return join(absoluteOutputPath, compileTemplateString(fileName, properties));
};
