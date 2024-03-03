module.exports = {
  extends: 'stylelint-config-standard-scss',
  ignoreFiles: '',
  rules: {
    'color-function-notation': 'legacy', // breaks RGBA syntax
    'no-descending-specificity': null,
    'selector-class-pattern': [
      '^([_a-z][a-z0-9]*)([-_]{1,2}[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep', 'input-placeholder'] }],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^page/', '/^mat/', '/^cinq/', '/^snack/', '/^ng/', '/^text/', '/^action/'],
      },
    ],
  },
}
