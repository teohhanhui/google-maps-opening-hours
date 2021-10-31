module.exports = {
  extends: [
    'airbnb-base',
  ],
  env: {
    es2020: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-underscore-dangle': ['error', {
      allow: ['_id'],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    }],
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_',
    }],
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true,
    }],
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false,
    }],
  },
};
