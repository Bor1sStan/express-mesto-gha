module.exports = {
  root: true,
  env: {
    browser: false,
    node: true,
    jest: true,
    mongo: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:ternary/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'promise', 'import',
  ],
  rules: {
    'no-unexpected-multiline': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
