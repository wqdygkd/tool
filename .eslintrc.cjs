module.exports = {
  root: true,
  overrides: [
    {
      files: ['packages/cli/**'],
      extends: ['@wqdy/eslint-config'],
      rules: {
        'arrow-parens': [2, 'as-needed'],
        'unicorn/prevent-abbreviations': 0
        // 'no-unreachable': 1,
        // 'no-unused-vars': 1,
        // 'no-debugger': 1
      },
      globals: {
        unsafeWindow: 'writable',
        GM_getValue: 'readonly',
        GM_setValue: 'readonly',
        GM_cookie: 'readonly',
        GM_registerMenuCommand: 'readonly',
        cookieStore: 'readonly'
      }
    },
    {
      files: ['packages/web/**'],
      extends: ['@wqdy/eslint-config-vue2']
    }
  ]
}





// module.exports = {
//   extends: ['wqdy'],
//   env: {
//     browser: true
//   },
//   rules: {
//     'unicorn/prevent-abbreviations': 0
//   },
//   globals: {
//     unsafeWindow: 'writable',
//     GM_getValue: 'readonly',
//     GM_setValue: 'readonly',
//     GM_cookie: 'readonly',
//     GM_registerMenuCommand: 'readonly',
//     cookieStore: 'readonly'
//   }
// }
