import buble from '@rollup/plugin-buble'

export default {
  input: 'index.js',
  output: {
    file: 'dist/utm-zone.js',
    format: 'umd',
    name: 'utmZone'
  },
  plugins: [
    buble()
  ]
}
