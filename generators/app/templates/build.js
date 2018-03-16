const rollup = require('rollup');
const removeScope = require('remove-scope').removeScope;
const path = require('path');
const babel = require('rollup-plugin-babel');
const fse = require('fs-extra');
const scss = require('rollup-plugin-scss');
const json = require('rollup-plugin-json');

const rootFolder = path.join(process.cwd());
const libNameWithScope = require(path.join(rootFolder, 'package.json')).name;
const libName = removeScope(libNameWithScope);
const libNameFile = libName.replace(/\./g, '_');
const distFolder = path.join(rootFolder, 'dist');

const inputOptions = {
  input: path.join(rootFolder, `index.js`),
  external: ['react', 'prop-types'],
  plugins: [
    scss({
      output: path.join(distFolder, `${libNameFile}.scss`)
    }),
    json({
      exclude: 'node_modules/**',
      preferConst: true
    }),
    babel({exclude: 'node_modules/**'})
  ]
};

const outputOptions = {
  file: path.join(distFolder, `${libNameFile}.umd.js`),
  format: 'umd',
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  },
  name: libName
};

fse.remove(distFolder)
  .then(() => {
    return rollup.rollup(inputOptions);
  })
  .then((bundle) => {
    bundle.write(outputOptions);
  })
  .catch((err) => {
    console.error('BUILD ERROR');
    console.error(err);
  });


