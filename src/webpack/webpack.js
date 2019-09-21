var webpack = require('webpack');
var webpackMerge = require('webpack-merge')

module.exports = {
    mode : 'production',
    entry : {
        'vendor': './src/vendor.ts',
        'polyfills': './src/polyfills.ts',
        'main': './src/main.ts'
    },
    output :{
        path : ('dist'),
        publicPath : '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module : {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { 
                        loader: 'css-loader', 
                        options: { 
                            sourceMap: true 
                        } 
                    },
                    { 
                        loader: 'sass-loader', 
                        options: { 
                            sourceMap: true 
                        } 
                    }
                ],
                include: helpers.root('src', 'app')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            helpers.root('dist'),
            {
                root: helpers.root(),
                verbose: true
            }
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};

