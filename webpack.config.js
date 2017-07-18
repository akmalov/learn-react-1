const path = require('path');
const loaders = require('./webpack.config.loaders')();
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');

const common = {
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, 'src', 'index.js')],
    output: {
        filename: 'bundle.js',
        path: path.resolve('public'),
    },
    module: {
        loaders
    }
};

module.exports = function(env) {
   if (env === 'production'){
       return common;
   }
    if (env === 'development'){
        return merge([
            common,
            devserver()
        ])
    }
};