module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    mocha: true
  },
  extends: ['strongloop'],
  globals: {},
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'max-len': ['error', { code: 101 }],
    'no-duplicate-imports': ['error'],
    'no-new-func': ['off'],
    'no-useless-call': ['off'],
    'comma-dangle': ['off']
  }
};
