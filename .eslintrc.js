module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "global-require": 0,
    "react/forbid-prop-types": 0
  },
};
