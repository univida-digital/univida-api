module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "standard",
    "prettier"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "tsx": true,
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "eslint-plugin-import-helpers", "prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": ["module", "/^@shared/", ["parent", "sibling", "index"]],
        "alphabetize": {
          "order": "asc",
          "ignoreCase": true
        }
      }
    ],
    "no-unused-vars": "off",
    "import/no-unresolved": "off",
    "react/prop-types": "off",
    "camelcase": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "off"
  }
};
