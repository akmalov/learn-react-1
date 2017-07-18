module.exports = function() {
    return [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: ['babel-loader']
        },

        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader'
            ]
        },

        {
            test: /\.(jpe?g|png|gif|svg|)$/i,
            loader: 'file-loader'
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
        }
    ]
};