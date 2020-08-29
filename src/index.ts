import cgen from './core';
import { LocalsObject } from 'pug';
import { CgenConfig } from './types';
import { REACT_TS_CONFIG } from './constants';

const config: CgenConfig = {
  'react-ts': REACT_TS_CONFIG,
};

const properties: LocalsObject = {
  componentName: 'FuckYou',
};

cgen('react-ts', config, properties);
