const glob = require('glob');
const files = glob.sync('./src/views/*/main.js');

files.forEach(item => {
	let name =  /.*\/(views\/.*?\/main)\.js/.exec(item)
	// console.log(name)
	// console.log(item)
});

const pages ={
	activity: {
		// 入口
		entry: 'src/views/activity/main.js',
		// 模板来源, 不写时默认从根目录的public/index.html获取
		template: './public/index.html',
		// 打包根目录的html文件名, 默认使用pages的每一项key
		// filename: 'index.html',
		// 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
		title: 'activity',
		// 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk。
		chunks: ['chunk-vendors', 'chunk-common', 'activity']
	},
	recharge: {
		entry: 'src/views/recharge/main.js',
		template: './public/index.html',
		filename: 'recharge.html',
		title: 'recharge',
		chunks: ['chunk-vendors', 'chunk-common', 'recharge']
	}
};


module.exports = {
	publicPath: './',
	outputDir: 'dist',
	filenameHashing: true,
	pages: pages,
	productionSourceMap: process.env.NODE_ENV === 'development',
	devServer: {
		index: 'recharge.html',
	}
};
