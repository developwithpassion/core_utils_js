module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['strongloop'],
  globals: {},
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'max-len': ['error', { code: 110 }],
    'no-duplicate-imports': ['error'],
    'no-new-func': ['off'],
    'no-useless-call': ['off'],
    'comma-dangle': ['off']
  }
};
