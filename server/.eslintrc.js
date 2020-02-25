module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  plugins: ["import"],
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
  }
}
