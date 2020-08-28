import { JobConfig, PredefinedConfigs, ProjectArchetypeName } from '../types';

export const NO_JOBS_MSG = 'No jobs were provided.  Please provide a valid cgen job.';

export const reactTsConfig: JobConfig = {
  outPath: './components',
  templatesDir: './templates',
  pugOptions: {},
  fileNames: {
    index: 'index.ts',
    types: 'types.ts',
  },
};

export const reactTsStorybookConfig: JobConfig = {
  fileNames: {
    dirName: '#{componentName}',
    fc: '#{componentName}.tsx',
    index: 'index.ts',
    types: 'types.ts',
  },
};
export const reactTsArchetype: ProjectArchetypeName = 'react-ts';
export const reactTsStorybookArchetype: ProjectArchetypeName = 'react-ts-storybook';

export const jobArchetypes: PredefinedConfigs = {
  [reactTsArchetype]: reactTsConfig,
  [reactTsStorybookArchetype]: reactTsStorybookConfig,
};
