/** @type {import('eslint').Linter.Config} */
module.exports = {
  globals: {
    __dirname: "off",
    __filename: "off",
    // custom utility types defined in @types/globals.d.ts
    AnyObj: "readonly",
    EmptyObj: "readonly",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist"],
  rules: {
    quotes: ["warn", "double"],
    "import/extensions": ["error", "ignorePackages", {
      js: "never",
      ts: "never",
    }],
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
      files: ["./*.js", "./utils/**/*.js"],
      rules: {
        "import/extensions": ["error", "ignorePackages"],
      },
    },
    {
      files: ["./**/*.{test,spec}.ts"],
      extends: ["plugin:jest/recommended"],
    },
  ],
};
