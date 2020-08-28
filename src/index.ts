import { LocalsObject } from 'pug';
import { generateContent } from './generator';
import { CgenConfig, JobConfig } from './types';

export const config: CgenConfig = {
  defaultJob: {
    outPath: './src/components',
    templatesDir: './templates',
    pugOptions: {},
    fileNames: {
      index: 'index.ts',
      types: 'types.ts',
    },
  },
  react: {
    outPath: '#{componentName}',
    fileNames: {
      fc: '#{componentName}.tsx',
      index: 'index.ts',
      types: 'types.ts',
    },
  },
};

const job: JobConfig = {
  outPath: './victory',
  templatesDir: './src/templates/react',
  fileNames: {
    fc: '#{componentName}-test.tsx',
  },
};

const properties: LocalsObject = {
  componentName: 'Test',
};

generateContent('fc', properties, job);

// info(compilePath('./templates/#{ass}', { ass: 'SHIT' }));
