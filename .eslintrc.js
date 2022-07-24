module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  rules: {
    'no-debugger' : 'off',
    //  'no-unused-vars': 'warn',
    'vue/no-unused-vars': "off",
    "no-unused-vars": [2, { 
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none" 
    }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
