/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = require('path');
const packages = require('./packages');

module.exports = function (w) {
  process.env.NODE_PATH = path.join(w.projectCacheDir, 'Source');
  
  let packagesGlob = `@(${packages.join('|')})`;
  let compilers = {};
  compilers[`Source/${packagesGlob}/**/*.@(ts|js)`] = w.compilers.babel(JSON.parse(require('fs').readFileSync('.babelrc')));
  
  let files = [
    { pattern: 'Source/**/package.json', instrument: false} ,
    { pattern: 'Source/**/node_modules/**/*', instrument: false},
    { pattern: 'node_modules/chai', instrument: false},
    { pattern: 'node_modules/chai-as-promised', instrument: false },
    { pattern: 'node_modules/sinon/pkg', instrument: false },
    { pattern: 'node_modules/sinon-chai', instrument: false },
    { pattern: 'Source/**/*.d.ts', ignore: true },
    { pattern: `Source/${packagesGlob}/lib/**`, ignore: true },
    { pattern: `Source/${packagesGlob}/**/for_*/**/!(given)/*.@(ts|js)`, ignore: true },
    { pattern: `Source/${packagesGlob}/**/for_*/*.@(ts|js)`, ignore: true },
    { pattern: `Source/${packagesGlob}/**/for_*/**/given/**/*.@(ts|js)`},
    { pattern: `Source/${packagesGlob}/**/*.@(ts|js)`}
  ]
  let tests = [
    { pattern: `Source/${packagesGlob}/**/for_*/**/given/**/*.@(ts|js)`, ignore: true },
    { pattern: `Source/${packagesGlob}/**/for_*/**/!(given)/*.@(ts|js)`},
    { pattern: `Source/${packagesGlob}/**/for_*/*.@(ts|js)`}
  ];
    return {
      files,
      tests,
      testFramework: 'mocha',
      env: {
        type: 'node',
        runner: 'node'
      },
      compilers,
      setup: (w) => {
        let packages = [
          'boilerplates',
          'commands',
          'common',
          'configurations',
          'dependencies',
          'files',
          'host',
          'logging',
          'packages',
          'plugins',
          'utilities'
        ];

        let aliases = {};
        packages.forEach(_ => {
          aliases[`@dolittle/tooling.${_ === 'common'? 'common' : `common.${_}` }`] = `${w.projectCacheDir}/Source/${_}`;
        });
        require('module-alias').addAliases(aliases);
        process.env.WALLABY_TESTING = true;
        global.expect = chai.expect;
        let should = chai.should();
        global.sinon = require('sinon');
        let sinonChai = require('sinon-chai');
        let chaiAsPromised = require('chai-as-promised');
        chai.use(sinonChai);
        chai.use(chaiAsPromised);

        let winston = require('winston');
        global.mock = require('@fluffy-spoon/substitute').Substitute;
        
        global.logger = winston.createLogger({});
      }
    };
  };