import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'animated-button/animated-button.js',
  output: [
    {
      file: 'dist/animated-button.js',
      format: 'es'
    },
    {
      file: 'dist/animated-button.umd.js',
      format: 'umd',
      name: 'AnimatedButton'
    }
  ],
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        { src: 'animated-button/animated-button.css', dest: 'dist' },
        { src: 'demo/*', dest: 'dist' }
      ]
    })
  ]
};