const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    mode: 'development',
    
    entry: {
        egocloud: path.resolve(__dirname, '../src/index.ts')
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                include: [ path.resolve(__dirname, '../src')],
                // exclude: /node_modules/,
            }
        ]
    },
    
    // plugins: [ new HtmlWebpackPlugin(
    //     {
    //         title: 'EgoCloud',
    //         filename: 'index.html',
    //         template: path.resolve(__dirname, '../src/template.html')
    //     }
    // )],
    
    resolve: {
        extensions: ['.ts', '.js']
    },
    
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js' 
    },
    
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
}