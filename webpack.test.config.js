const debug = process.env.NODE_ENV !== "production";

const webpack = require("webpack");
const path = require("path");

module.exports = [
	{
		context: path.join(__dirname, "docs"),
		devtool: debug ? "inline-sourcemap" : null,
		entry: {
			docsReactBundle: path.join(__dirname, "/docs/js/docsReact.js"),
		},
		output: {
			filename: "[name].js",
			path: path.join(__dirname, "/docs/dist/js"),
		},
		plugins: debug ? [] : [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
		],
		devServer: {
			port: 8082,
			host: "0.0.0.0",
			historyApiFallback: true,
			contentBase: path.join(__dirname, "src"),
		},
		module: {
			rules: [
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
			],
		},
	},
];