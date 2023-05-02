const path = require('path');

module.exports = {
    
    mode: 'production',
    entry: {
        egocloud: path.resolve(__dirname, './src/egocloud.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:  /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'egocloud.js', 
        library: 'egocloud'
        // libraryTarget: 'umd'
    }
}