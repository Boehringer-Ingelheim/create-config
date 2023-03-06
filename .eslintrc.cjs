module.exports = {
  extends: [
    "@boehringer-ingelheim/eslint-config/base/strict",
    // NOTE: Prettier has to be the last one to work
    "prettier",
  ],
  rules: {
    indent: "warn",
  },
};
