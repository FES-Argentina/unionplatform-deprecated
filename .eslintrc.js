module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/destructuring-assignment": [1, "always", { "ignoreClassFields": true }]
  },
};
