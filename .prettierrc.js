module.exports = {
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 缩进不使用tab，使用空格
  printWidth: 100, // 超过最大值换行
  singleQuote: true, // 使用单引号代替双引号
  semi: false, // 句尾不添加分号
  trailingComma: 'none', // 尾部不添加逗号
  bracketSpacing: true, // 对象的key和value之间加空格
  quoteProps: 'as-needed', // 对象下的key值，有需要的情况下可以加引号
  endOfLine: 'auto', // 行尾换行符，维持原样
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    }
  ],
  arrowParens: 'always' // (x) => {} 箭头函数参数一定要有小括号()
}
