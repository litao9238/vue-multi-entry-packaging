const glob = require('glob');
const files = glob.sync('./src/views/*/main.js');

files.forEach(item => {
	let name =  /.*\/(views\/.*?\/main)\.js/.exec(item)
	console.log(name)
	console.log(item)
});

module.exports = {
	publicPath: './',
	pages: {

		recharge: {
			entry: './src/views/recharge/main.js',
			template: 'public/index.html',
			// template: './src/views/recharge/recharge.html',
			filename: 'index.html',
			title: '首充',
			chunks: ['chunk-vendors', 'chunk-common', 'lottery']
		},
		lottery: {
			entry: './src/views/lottery/main.js',
			template: 'public/index.html',
			// template: './src/views/lottery/lottery.html',
			filename: 'index.html',
			title: '活动',
			chunks: ['chunk-vendors', 'chunk-common', 'lottery']
		},
	},
	devServer: {
		// index: 'lottery.html',
		// index: 'recharge.html',
	}
};
