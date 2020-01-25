module.exports = {
  "root": true,
  "env": {
    node: true
  },
  "extends": [
    "holo",
    "holo/vue"
  ],
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": [1, 2, { SwitchCase: 1 }],
    "linebreak-style": [1, "windows"]
  },
  "parserOptions": {
    parser: "babel-eslint"
  }
};
