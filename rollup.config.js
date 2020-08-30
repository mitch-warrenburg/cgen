import hashbang from 'rollup-plugin-hashbang';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

export default {
  input: 'src/react-cli.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    hashbang(),
    peerDepsExternal(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
