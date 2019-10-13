/* global __dirname */
const path = require('path');

module.exports = function(config) {
  const browsers = config.browsers;
  config.set({

    basePath: '',
    frameworks: ['jasmine', 'fixture', 'viewport'],
    files: [
      // Adding test target files
      { pattern: 'src/**/main.min.js', watched: false, },
      'src/**/*.spec.ts',
      // Adding style and images
      { pattern: 'dist/img/**/*.*', served: true, included: false, watched: false },
      { pattern: 'dist/css/*.*.css' },
      // Adding fixture html for karma-fixture
      { pattern: 'test/fixtures/**/*.html', served: true, included: false, watched: false, }
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['webpack'],
      // for karma-fixture not working
      'src/**/fixtures/**/*.html'   : ['html2js'],
      'src/**/fixtures/**/*.json'   : ['json_fixtures']
    },
    // for karma-fixture
    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['src', 'test', 'node_modules'],
        alias: {
          test: path.resolve(__dirname, 'src/test')
        }
      },
      devtool: browsers.indexOf('ChromeDebugging') > -1 ? 'eval-source-map' : 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              compilerOptions: {
                sourceMap: true
              }
            }
          }
        ]
      }
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    reporters: ['mocha'],
    webpackServer: { noInfo: config.noInfo },
    browsers: browsers && browsers.length > 0 ? browsers : ['ChromeHeadless'],
    proxies: {
      '/dist': '/base/dist'
    },
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333'],
        debug: true
      }
    },
    singleRun: false,
    mochaReporter: {
      ignoreSkipped: true
    },
    webpackMiddleware: {
      logLevel: 'silent'
    },
  });
};
