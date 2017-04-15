const {resolve} = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading only- means to only hot reload for
    // successful updates

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

  devtool: 'inline-source-map',

  devServer: {
    proxy: [
      {
        context: ['/graphql', '/auth/login', '/auth/logout', '/auth/google/callback'],
        target: 'http://localhost:3000',
        secure: false
      }
    ],
    // proxy: {
    //   '/graphql': {
    //     target: 'http://localhost:3000',
    //     secure: false
    //   }
    // },
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    stats: {
      // Add asset Information
      assets: false,
      // Sort assets by a field
      assetsSort: 'field',
      // Add information about cached (not built) modules
      cached: true,
      // Add children information
      children: true,
      // Add chunk information (setting this to `false` allows for a less
      // verbose output)
      chunks: false,
      // Add built modules information to chunk information
      chunkModules: true,
      // Add the origins of chunks and chunk merging info
      chunkOrigins: true,
      // Sort the chunks by a field
      chunksSort: 'field',
      // Context directory for request shortening
      context: '../src/',
      // `webpack --colors` equivalent
      colors: true,
      // Add errors
      errors: true,
      // Add details to errors (like resolving log)
      errorDetails: true,
      // Add the hash of the compilation
      hash: false,
      // Add built modules information
      modules: false,
      // Sort the modules by a field
      modulesSort: 'field',
      // Add public path information
      publicPath: true,
      // Add information about the reasons why modules are included
      reasons: true,
      // Add the source code of modules
      source: true,
      // Add timing information
      timings: false,
      // Add webpack version information
      version: false,
      // Add warnings
      warnings: true
    }

  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }, {
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
      }, {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
}
