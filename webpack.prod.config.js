const {resolve} = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    './index.js'
        // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
        // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
                    // 'postcss-loader',
        ]
      }, {
        test: /\.svg$/,
        loaders: [
          'babel-loader', {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [
                  {
                    removeTitle: false
                  }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      }, {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'})]
}
