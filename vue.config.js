
const WebpackPluginCopy = require('./webpack-plugin-copy')

const glob = require('glob');
const files = glob.sync('./src/views/*/main.js');
let pages = {}
const options = {
  mt4: {
    title: '最受欢迎的mt4平台'
  },
  mt4_hongbao: {
    title: '最受欢迎的mt4平台'
  },
  test: {
    title: '我是测试用'
  },
}
files.forEach((item, index) => {
  const splitName = item.split('/')
  const name = splitName[splitName.length - 2]
  pages[name] = {
    // 入口
    entry: item,
    // 模板来源, 不写时默认从根目录的public/index.html获取
    template: './public/index.html',
    // 打包根目录的html文件名, 默认使用pages的每一项key
    filename: `${name}.html`,
    // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: options[name] ? options[name].title : name,
    // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', name]
  }
});
console.log(pages)


module.exports = {
  publicPath: './',
  outputDir: 'dist/subject',
  filenameHashing: true,
  pages: pages,
  productionSourceMap: process.env.NODE_ENV === 'development',
  configureWebpack: config => {
    config.plugins.push(
      new WebpackPluginCopy()
    )
  }
};
