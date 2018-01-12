import React from 'react';
import { renderToString } from 'react-dom/server';
import { Volume, createFsFromVolume } from 'memfs';
import htmlTemplate from './html-template.js';
import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import injectNodeGlobals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import * as path from 'path';
import * as nodeFs from 'fs';
import * as util from 'util';
import App from './src/components/App.js';
import * as sass from 'node-sass';

const promisify = util.promisify;
const sassRender = promisify(sass.render);

const bundleJs = () => rollup({
	//inputOptions
	input: path.join(__dirname, 'src', 'main.js'),
	plugins: [
		babel({
			babelrc: false,
			exclude: path.join(__dirname, '/node_modules/**'),
			presets: [
				'es2015-rollup',
				'react',
			],
			//plugins: [
			//	'styled-jsx/babel',
			//],
		}),
		nodeResolve({
			jsnext: true,
			//modulesOnly: true,
			module: true,
			main: true,
			browser: true,
			extensions: [ '.js', '.json' ],
		}),
		commonjs({
			include: path.join(__dirname, '/node_modules/**'),
			//sourceMap: false,
		}),
		injectNodeGlobals(),
	],
	external: [
		'react',
		'react-dom',
		'lodash',
	],
}).then(bundle => {
	return bundle.generate({
		//outputOptions
		format: 'iife',
		globals: {
			'react': 'React',
			'react-dom': 'ReactDOM',
			'lodash': '_',
		},
	}).then(({code, map}) => {
		return code;
	});
});

export default (componentDataList) => {
	try {
		const vol = new Volume();
		const fs = createFsFromVolume(vol);
		const initialState = {
			componentDataList,
			currentComponent: componentDataList[0].baseName,
		};

		const writeFile = promisify(fs.writeFile);

		return Promise.all([

			writeFile('/index.html', Buffer.from(htmlTemplate({
				title: `React Peek`,
				loadReact: true,
				loadLodash: true,
				bundlePath: 'bundle.js',
				styleCssPath: 'styles.css',
				initialState,
				body: renderToString(<App {...initialState} />),
			}), 'utf8')),

			promisify(fs.mkdir)('/react-peek'),

			writeFile('/react-peek/component-data.json', JSON.stringify(componentDataList, null, 2)),

			bundleJs().then((code) =>
				writeFile('/bundle.js', code)),

			sassRender({
				file: path.join(__dirname, 'src', 'index.scss'),
			}).then(({css}) =>
				writeFile('/styles.css', css)),

		]).then(() => fs);

	} catch (err) {
		return Promise.reject(err);
	}
};
