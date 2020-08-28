import { join } from 'path';
import { Map } from 'immutable';
import chalk, { Chalk } from 'chalk';
import pug, { LocalsObject } from 'pug';
import { exit, mkdir, test } from 'shelljs';
import { jobArchetypes, NO_JOBS_MSG } from './constants';
import { CgenConfig, JobConfig, ProjectArchetypeName } from './types';
import { compilePath, compileTemplateString } from './utils/pug-util';
import { info } from './utils/logging';

const mergeDeep = <T>(objectOne?: T, objectTwo?: T): T => {
  return Map(objectOne || {})
    .mergeDeep(objectTwo || {})
    .toJS() as T;
};

const emptyConig: Readonly<JobConfig> = { fileNames: {} };

const getJobConfig = (
  job: JobConfig | ProjectArchetypeName = 'react-ts',
  baseJob: JobConfig = emptyConig
): JobConfig => {
  const archetype = jobArchetypes[job as string];
  return archetype ? mergeDeep(baseJob, archetype) : mergeDeep(baseJob, job);
};

export const entry = (jobName = '', config: CgenConfig = {}) => {
  const { base, ...jobs } = config;

  if (!jobs[jobName]) {
    error(NO_JOBS_MSG);
    exit(1);
  }

  const jobConfig = getJobConfig(jobs[jobName], base);

  // generateContent('fc', properties, jobConfig);
};

export const generateContent = (
  logOutput = false,
  template: string,
  config: JobConfig,
  properties: LocalsObject
) => {
  const {
    fileNames,
    pugOptions,
    outPath = './src',
    defaultProperties = {},
    templatesDir = './templates',
  } = config;

  const mergedProperties = mergeDeep(defaultProperties, properties);
  const fileName = fileNames[template];
  const filePath = getPath(outPath, fileName, mergedProperties);
  const templatePath = getPath(templatesDir, `${template.replace('.pug', '')}.pug`);

  if (!test('-d', filePath)) {
    const content = pug.compileFile(templatePath, pugOptions)(properties);
    if (logOutput) return content;
  }

  error('aww shit');
  exit(1);
};

const getPath = (path: string, fileName: string, properties?: LocalsObject) => {
  const absoluteOutputPath = compilePath(path, properties);

  !test('-d', absoluteOutputPath) && mkdir('-p', absoluteOutputPath);

  return join(absoluteOutputPath, compileTemplateString(fileName, properties));
};
