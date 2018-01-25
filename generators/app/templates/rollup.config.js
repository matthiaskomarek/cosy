import babel from 'rollup-plugin-babel';
import {removeScope} from 'remove-scope';
const path = require('path');

const rootFolder = path.join(process.cwd());
const libNameWithScope = require(path.join(rootFolder, 'package.json')).name;
const libName = removeScope(libNameWithScope);
const distFolder = path.join(rootFolder, 'dist');

export default {
  input: path.join(rootFolder, `index.js`),
  output: [{
    file: path.join(distFolder, `${libName}.umd.js`),
    format: 'umd'
  },
    {
      file: path.join(distFolder, `${libName}.js`),
      format: 'es'
    }
  ],
  external: ['react'],
  globals: {
    react: 'React'
  },
  name: libName,
  plugins: [
    // resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
