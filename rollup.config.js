
import typescript from '@rollup/plugin-typescript';
import define from 'rollup-plugin-define';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json');
const ENV_PROD = process.env.BUILD === 'production';

const output = (name) => {
  return [
    {
      file: `packages/${name}/dist/index.umd.js`,
      format: 'umd',
      name: 'easepick',
      sourcemap: false,
      extend: true,
      banner: `/* 
  Copyright 2021 Rinat G.
  Project URL : https://easepick.jsx4.com/
  Licensed under the Apache License, Version 2.0 (the "License") http://www.apache.org/licenses/LICENSE-2.0
*/
      `,
      globals(id) {
        if (/^@easepick\//.test(id)) {
          return 'easepick';
        }

        return id;
      }
    },
    {
      file: `packages/${name}/dist/index.esm.js`,
      format: 'esm',
      sourcemap: false,
      extend: true,
    },
  ];
}

const input = (name) => {
  return `packages/${name}/src/index.ts`;
}

const getPackageConfig = (name) => {
  return {
    input: input(name),
    output: output(name),
    plugins: [
      define({
        replacements: {
          __VERSION__: JSON.stringify(pkg.version),
        }
      }),
      resolve({
        resolveOnly: [/^@easepick\/.*$/]
      }),
      typescript({
        tsconfig: `packages/${name}/tsconfig.json`,
        outputToFilesystem: false,
      }),
      postcss({
        extract: 'index.css',
        plugins: [autoprefixer],
        minimize: ENV_PROD,
      }),
      ENV_PROD && terser(),
    ],
    external(id) {
      return /^@easepick\//.test(id);
    }
  };
}

export default [
  getPackageConfig('datetime'),
  getPackageConfig('core'),

  getPackageConfig('base-plugin'),
  getPackageConfig('lock-plugin'),
  getPackageConfig('range-plugin'),
  getPackageConfig('preset-plugin'),
  getPackageConfig('time-plugin'),
  getPackageConfig('kbd-plugin'),

  // @easepick/bundle
  {
    input: 'packages/bundle/src/index.ts',
    output: output('bundle'),
    plugins: [
      define({
        replacements: {
          __VERSION__: JSON.stringify(pkg.version),
        }
      }),
      resolve({
        dedupe: ['@easepick/base-plugin'],
        resolveOnly: [/^@easepick\/.*$/]
      }),
      typescript({
        tsconfig: 'packages/bundle/tsconfig.json',
        outputToFilesystem: false,
      }),
      postcss({
        extract: 'index.css',
        plugins: [autoprefixer],
        minimize: ENV_PROD,
      }),
      ENV_PROD && terser(),
    ],
  },
];