import { Chalk } from 'chalk';
import { LocalsObject, Options } from 'pug';

export type ProjectArchetypeName = 'react-ts' | 'react-ts-storybook';

export interface TemplateNameMapping {
  [templateName: string]: string;
}

export interface TemplatesConfig {
  include?: Array<RegExp>;
  exclude?: Array<RegExp>;
  includePaths?: Array<string>;
  excludePaths?: Array<string>;
}

export interface JobConfig {
  outPath?: string;
  pugOptions?: Options;
  templates?: TemplatesConfig;
  defaultProperties?: LocalsObject;
  fileNames: TemplateNameMapping;
}

export interface CgenConfig {
  base?: JobConfig;
  [name: string]: JobConfig | ProjectArchetypeName;
}

export type PredefinedConfigs = {
  [name in ProjectArchetypeName]: JobConfig;
};

export type TerminalColor =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'grey'
  | 'darkGrey'
  | 'foreground'
  | 'background';

export type TerminalColorsDefinitions = {
  [color in TerminalColor]: Chalk;
};
