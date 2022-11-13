/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist"],
  root: true,
  rules: {
    quotes: ["warn", "double"],
    "import/extensions": ["error", "ignorePackages", {
      js: "never",
      ts: "never",
    }],
    "no-console": "off",
    "import/prefer-default-export": "off",
    "import/order": ["error", {
      "newlines-between": "always",
    }],
    semi: "off",
    "@typescript-eslint/semi": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      args: "all",
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
    "@typescript-eslint/no-explicit-any": "off",
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/member-delimiter-style": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
  overrides: [
    {
      files: ["*.js", "utils/**/*.js"],
      rules: {
        "import/extensions": ["error", "ignorePackages"],
      },
    },
  ],
};
