/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');


module.exports = function (w) {

  process.env.NODE_PATH += path.delimiter + path.join(w.projectCacheDir, 'Source');
    return {
      files: [
        { pattern: 'Source/**/package.json', instrument: false} ,
        { pattern: 'node_modules/chai', instrument: false},
        { pattern: 'node_modules/chai-as-promised', instrument: false },
        { pattern: 'node_modules/sinon/pkg', instrument: false },
        { pattern: 'node_modules/sinon-chai', instrument: false },
        { pattern: 'Source/**/*.d.ts', ignore: true },
        { pattern: 'Source/**/lib/**', ignore: true },
        { pattern: 'Source/**/for_*/**/!(given)/*.@(ts|js)', ignore: true },
        { pattern: 'Source/**/for_*/*.@(ts|js)', ignore: true },
        { pattern: 'Source/**/for_*/**/given/**/*.@(ts|js)' },
        { pattern: 'Source/**/*.@(ts|js)' }
      ],
      tests: [
        { pattern: 'Source/**/for_*/**/given/**/*.@(ts|js)', ignore: true },
        'Source/**/for_*/**/!(given)/*.@(ts|js)',
        'Source/**/for_*/*.@(ts|js)'
      ],
      testFramework: 'mocha',
      env: {
        type: 'node',
        runner: 'node'
      },
      compilers: {
        // 'Source/**/*.ts': w.compilers.typeScript({module: 'es6'})
        'Source/**/*.@(ts|js)': w.compilers.babel(JSON.parse(require('fs').readFileSync('.babelrc'))),
      },
      setup: (w) => {
        require('module-alias').addAliases({
          '@dolittle/tooling.common.utilities': w.projectCacheDir + '/Source/utilities',
          '@dolittle/tooling.common.configurations': w.projectCacheDir + '/Source/configurations',
          '@dolittle/tooling.common.dependencies': w.projectCacheDir + '/Source/dependencies',
          '@dolittle/tooling.common.boilerplates': w.projectCacheDir + '/Source/boilerplates'
        });
        process.env.WALLABY_TESTING = true;
        global.expect = chai.expect;
        let should = chai.should();
        global.sinon = require('sinon');
        let sinonChai = require('sinon-chai');
        chai.use(sinonChai);

        let winston = require('winston');
        global.logger = winston.createLogger({});
      }
    };
  };