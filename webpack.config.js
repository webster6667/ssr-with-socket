const {
		getResolveExtensions,
		getStyleRules,
		getScriptRules,
		getFileRules,
		getAliasFromFile
	  } = require('webpack-config-create-utils')(),
	  MiniCssExtractPlugin = require('mini-css-extract-plugin')


const extensions = getResolveExtensions(),
      alias = getAliasFromFile(__dirname),
      fileRules = getFileRules(),
	  styleRules = getStyleRules({
			sassFilesForImport: []
	  }),
	  scriptRules = getScriptRules()

const clientsConfig = {
	mode: 'development',
	name: 'client',
	entry: {
		server: ['@babel/polyfill', './src/client/index.tsx']
	},
	output: {
		path: __dirname,
		filename: 'public/client.js'
	},
	resolve: {
		extensions,
		alias
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "public/styles.css",
		})
	],
	module: {
		rules: [
			...styleRules,
			scriptRules,
			...fileRules
		]
	}
}

const serverConfig = {
	target: 'node',
	mode: 'development',
	name: 'server',
	entry: {
		server: ['@babel/polyfill', './src/server/index.tsx']
	},
	output: {
		path: __dirname,
		filename: 'server.js',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions,
		alias
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "public/styles.css",
		})
	],
	module: {
		rules: [
			...styleRules,
			scriptRules,
            ...fileRules
		]
	}
}

module.exports = [clientsConfig, serverConfig]