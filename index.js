require('babel-core/register')({
	presets: ['es2015', 'react'],
	//plugins: ['styled-jsx/babel'],
});
module.exports = require('./main.js').default;
