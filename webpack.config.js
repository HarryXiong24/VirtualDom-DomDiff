const path = require('path');
module.exports = {
  entry: path.join(__dirname, "/src/virtual-dom.js"), // 入口文件
  output: {
      path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
      filename: "virtualDom.js" //打包后输出文件的文件名
  },
  module: {
    // 模块
    // 配置规则
    rules: [
      /*
      css-loader解析css中的语法，如@import这种
      style-loader用于把css插入到模板html的head标签中
      至于为什么要两个，是因为loader的能力尽量要求单一
      */
      {
        // 匹配css结尾的文件
        test: /\.css$/,
        use: [
          {
            // 创建style标签，将js的样式资源插入进行，添加到head中生效
            loader: 'style-loader',
            options: {
              //改变样式插入的位置为head标签的顶部
              insertAt: 'top'
            }
          },
            // 将css变成commonjs模块加入到js中，里面的内容是字符串
          'css-loader' //主要解析@import这种路径
        ]
      }
    ]
  }
}