import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
	input: './lib/content.js',
	output: {file: './content.js', format: 'es'},
	plugins: [nodeResolve(), terser()],
};
