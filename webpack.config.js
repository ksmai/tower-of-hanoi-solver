const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve(...pathnames) {
  return path.resolve(__dirname, ...pathnames);
}

function join(root, pathname) {
  return path.join(root, pathname);
}

const src = resolve('src');
const docs = resolve('docs');
const main = join(src, 'main.js');
const index = join(src, 'index.html');
const publicPath = '/tower-of-hanoi-solver/';

const isProd = process.env.NODE_ENV === 'production';
let cssLoaders;
if (isProd) {
  cssLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  });
} else {
  cssLoaders = ['style-loader', 'css-loader', 'sass-loader'];
}

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
];
if (isProd) {
  const minifyOptions = {
    collapseWhitespace: true,
    conservativeCollapse: false,
  };
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      minChunks: function(module) {
        return module.context &&
          module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.css'),
    new HTMLPlugin({
      template: index,
      minify: minifyOptions,
    }),
    new HTMLPlugin({
      filename: '404.html',
      template: index,
      minify: minifyOptions,
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
      template: index,
    })
  );
}

const vueLoaderOptions = isProd ? { extractCSS: true } : {};

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

  entry: {
    main: ['babel-polyfill', main],
  },

  output: {
    path: docs,
    filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
    publicPath: publicPath,
  },

  resolve: {
    extensions: ['.js', '.vue'],
  },

  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
        options: vueLoaderOptions,
      },
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.s?css$/,
      use: cssLoaders,
    }],
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: {
      index: publicPath,
    },
    noInfo: true,
    hot: true,
  },
};
