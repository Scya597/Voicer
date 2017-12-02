module.exports = [
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.js$/,
    loaders: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.scss$/,
    loader: 'style-loader!css-loader!postcss-loader!sass-loader',
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'file-loader',
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?prefix=font/&limit=5000',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/gif',
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/jpg',
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/png',
  },
  {
    test: /\.ico$/,
    loader: 'file-loader?name=[name].[ext]',
  },
  {
    test: /\.mp3$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'file-loader?name=[name].[ext]',
  },
];
