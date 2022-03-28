import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
const path = require('path');


export default {
  input: 'configurator/index.ts',
  output: {
    file: `assets/configurator/index.js`,
    format: 'umd',
    globals(id) {
      if (/^@easepick\//.test(id)) {
        return 'easepick';
      }

      return id;
    }
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      outputToFilesystem: false,
    }),
    postcss({
      extract: 'index.css',
      plugins: [autoprefixer],
      minimize: true,
    }),
    terser(),
  ],
  external(id) {
    return /^@easepick\//.test(id);
  }
};