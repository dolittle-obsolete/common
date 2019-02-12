"use strict";
const fs = require('fs');
const babelConfigLoader = require('@dolittle/build/dist/babelConfigLoader').default;

const babelConfig = babelConfigLoader(process.cwd());

module.exports = (config) => {
    config.set({
        frameworks: ['mocha', 'chai', 'chai-as-promised'],
        preprocessors: {
            'Source/**/*.js': ['babel']
        },
        files: [
            'Source/**/*.js'
        ],
        babelPreprocessor: {
            options: babelConfig
        },
        port: 9876,
        browsers: ['PhantomJS'],
        colors: true,
        reporters: ['progress'],
        singleRun: true
    })
};