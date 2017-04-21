const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname, '../carbon-fields');

module.exports = {
    context: __dirname,
    entry: './assets/react/bootstrap.js',
    output: {
        path: path.resolve(__dirname, 'assets/js/'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        modules: [
            path.resolve(root, 'assets/js'),
            path.resolve(__dirname, 'assets/react'),
            'node_modules'
        ]
    },

    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            sourceType: 'this',
            manifest: require(path.resolve(root, 'assets/dist/carbon.vendor.json'))
        }),

        new webpack.DllReferencePlugin({
            context: root,
            sourceType: 'this',
            manifest: require(path.resolve(root, 'assets/dist/carbon.core.json'))
        })
    ],
};