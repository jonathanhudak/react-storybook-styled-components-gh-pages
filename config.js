import jsx from 'rollup-plugin-jsx';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import * as index from './src/index';

const sharedOptions = {
  plugins: [
    jsx({ factory: 'React.createElement' }),
    resolve({ extensions: ['.js', '.jsx', '.json'] }),
    babel(),
  ],
  external: ['react', 'styled-components'],
};

function createModuleExport(format, {
  input = './src/index.js',
  outputFileName = './index.js'
} = {}) {
  return {
    ...sharedOptions,
    input,
    output: {
      file: outputFileName,
      format,
    },
  };
}

const components = Object
  .keys(index)
  .map(c => createModuleExport('esm', {
    input: `./src/components/${c}.js`,
    outputFileName: `./components/${c}.js`,
  }));

export default[createModuleExport('cjs'), ...components];
