const debug = process.env.NODE_ENV !== "production";

const webpack = require("webpack");
const path = require("path");

const rules = [
	{
		test: /\.js$/,
		loader: "babel-loader",
		include: [
			path.join(__dirname, "src/js/"),
		],
		exclude: [
			path.join(__dirname, "node_modules/"),
		],
		query: {
			presets: ["react", "es2015", "stage-0"],
		},
	},
	{
		test: /\.s?css$/,
		use: [
			"style-loader",
			"css-loader",
			"sass-loader",
		],
	},
	{
		test: /.*\.(gif|png|jpe?g|svg)$/i,
		loaders: [
			"file-loader",
			{
				loader: "image-webpack-loader",
				query: {
					progressive: true,
					optimizationLevel: 7,
					interlaced: false,
					pngquant: { quality: "65-90", speed: 4 },
				},
			},
		],
	},
	{
		test: /\.json$/,
		loader: "json-loader",
		exclude: /node_modules/,
	},
];

module.exports = [
	{
		context: path.join(__dirname, "src"),
		devtool: debug ? "inline-sourcemap" : null,
		entry: {
			bundle: path.join(__dirname, "/src/js/index.js"),
		},
		output: {
			filename: "[name].js",
			path: path.join(__dirname, "/dist/js"),
			publicPath: "/uol-frontend-framework/dist/js/",
			library: "uol",
			libraryTarget: "umd",
		},
		externals: debug ? undefined : {
			react: "react",
			"react-dom": "react-dom",
		},
		plugins: debug ? [] : [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
		],
		devServer: {
			port: 8082,
			host: "0.0.0.0",
			contentBase: path.resolve(__dirname, "docs"),
			historyApiFallback: true,
		},
		module: { rules },
	},
];