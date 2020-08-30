import { JobConfig, PredefinedConfigs, ProjectArchetypeName } from '../types';

export const TEMPLATE_FILE_EXTENSION: Readonly<string> = '.pug';

export const EMPTY_JOB_CONFIG: Readonly<JobConfig> = { fileNames: {} };

export const DEFAULT_TEMPLATE_INCLUDE_PATHS: Readonly<Array<string>> = [
  '**/templates/**',
];

const DEFAULT_REACT_TEMPLATE_OUT_PATH: Readonly<string> =
  './src/components/#{componentName}';

export const REACT_TS_CONFIG: JobConfig = {
  fileNames: {
    test: 'test.tsx',
    index: 'cli.ts',
    types: 'types.ts',
    component: '#{componentName}.tsx',
  },
  outPath: DEFAULT_REACT_TEMPLATE_OUT_PATH,
  templates: { includePaths: ['src/templates/react-ts'] },
};

export const REACT_TS_STORYBOOK_CONFIG: JobConfig = {
  fileNames: {
    mdx: 'mdx.ts',
    test: 'test.tsx',
    index: 'cli.ts',
    types: 'types.ts',
    dirName: '#{componentName}',
    component: '#{componentName}.tsx',
    story: '#{componentName}.story.tsx',
  },
  outPath: DEFAULT_REACT_TEMPLATE_OUT_PATH,
  templates: { includePaths: ['src/templates/react-ts-storybook'] },
};
export const REACT_TS_ARCHETYPE_NAME: ProjectArchetypeName = 'react-ts';
export const REACT_TS_STORYBOOK_ARCHETYPE_NAME: ProjectArchetypeName =
  'react-ts-storybook';

export const PREDEFINED_ARCHETYPES: PredefinedConfigs = {
  [REACT_TS_ARCHETYPE_NAME]: REACT_TS_CONFIG,
  [REACT_TS_STORYBOOK_ARCHETYPE_NAME]: REACT_TS_STORYBOOK_CONFIG,
};
