import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/content.ts',
  output: { file: 'content.js', format: 'es' },
  plugins: [nodeResolve(), typescript()]
}