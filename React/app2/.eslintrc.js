module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['react-app'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
