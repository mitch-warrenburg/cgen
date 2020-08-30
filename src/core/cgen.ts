import { test } from 'shelljs';
import { LocalsObject } from 'pug';
import { basename, extname } from 'path';
import { CgenConfig, JobConfig, ProjectArchetypeName, TemplatesConfig } from '../types';
import {
  logger,
  mergeDeep,
  resolvePaths,
  logCgenConfig,
  resolveFilePath,
  compileTemplateFile,
  logGeneratedContent,
  logFatalAndTerminate,
  writeFile,
} from '../utils';
import {
  EMPTY_JOB_CONFIG,
  PREDEFINED_ARCHETYPES,
  TEMPLATE_FILE_EXTENSION,
  DEFAULT_TEMPLATE_INCLUDE_PATHS,
} from '../constants';

export const cgen = (
  jobName = '',
  config: CgenConfig = {},
  properties: LocalsObject = {}
) => {
  console.log('\n');

  const { base: baseJobConfig, ...jobs } = config;

  if (!jobs[jobName]) {
    logFatalAndTerminate(
      new Error('No jobs were provided.  Please provide a valid cgen job.')
    );
  }
  const resolvedJobConfig = mergeDefaultAndSpecifiedJobs(jobs[jobName], baseJobConfig);

  logCgenConfig(resolvedJobConfig);

  generateFiles(resolvedJobConfig, properties);
};

const resolveTemplateLocations = ({
  include = [],
  exclude = [],
  excludePaths = [],
  includePaths = DEFAULT_TEMPLATE_INCLUDE_PATHS as Array<string>,
}: TemplatesConfig) => {
  const included = resolvePaths(includePaths, exclude);
  const excluded = resolvePaths(excludePaths, include);

  return included
    .subtract(excluded)
    .toArray()
    .filter(path => TEMPLATE_FILE_EXTENSION === extname(path));
};

const mergeDefaultAndSpecifiedJobs = (
  jobConfig: JobConfig | ProjectArchetypeName = 'react-ts',
  baseJob: JobConfig = EMPTY_JOB_CONFIG
): JobConfig => {
  const archetype = PREDEFINED_ARCHETYPES[jobConfig as string];
  return archetype ? mergeDeep(baseJob, archetype) : mergeDeep(baseJob, jobConfig);
};

export const generateFiles = (jobConfig: JobConfig, properties?: LocalsObject) => {
  const { templates } = jobConfig;
  resolveTemplateLocations(templates).map(templatePath =>
    generateFileFromTemplate(templatePath, jobConfig, properties)
  );
};

const generateFileFromTemplate = (
  templatePath: string,
  jobConfig: JobConfig,
  properties: LocalsObject
): void => {
  const { fileNames, pugOptions, outPath = './src', defaultProperties = {} } = jobConfig;
  const mergedProperties = mergeDeep(defaultProperties, properties);
  const templateName = basename(templatePath, TEMPLATE_FILE_EXTENSION);

  if (!fileNames[templateName]) {
    logger.warn(
      `
      The fileNames configuration object does not define a fileName for template: %s.
      The template name will be used as a fallback.
    `,
      templateName
    );
  }

  const fileName = fileNames[templateName] || templateName;
  const fileOutputPath = resolveFilePath(outPath, fileName, mergedProperties);
  const fileExists = test('-f', fileOutputPath);

  if (fileExists) {
    logger.info(
      'File %s already exists.  Skipping %s...',
      basename(templatePath),
      basename(templatePath)
    );
  } else {
    const content = compileTemplateFile(templatePath, properties, pugOptions);
    logGeneratedContent(templatePath, content);
    writeFile(fileOutputPath, content);
  }
};

export default cgen;
