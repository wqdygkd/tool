module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'no-unreachable': 1,
    'no-unused-vars': 1,
    'no-debugger': 1
  }
}
