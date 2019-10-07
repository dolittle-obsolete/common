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
        { pattern: 'Source/**/node_modules/**/*', instrument: false},
        { pattern: 'node_modules/chai', instrument: false},
        { pattern: 'node_modules/chai-as-promised', instrument: false },
        { pattern: 'node_modules/sinon/pkg', instrument: false },
        { pattern: 'node_modules/sinon-chai', instrument: false },
        { pattern: 'Source/**/*.d.ts', ignore: true },
        { pattern: 'Source/**/lib/**', ignore: true },
        { pattern: 'Source/**/for_*/**/!(given)/*.@(ts|js)', ignore: true },
        { pattern: 'Source/**/for_*/*.@(ts|js)', ignore: true },
        { pattern: 'Source/**/for_*/**/given/**/*.@(ts|js)'},
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
          '@dolittle/tooling.common.boilerplates': w.projectCacheDir + '/Source/boilerplates',
          '@dolittle/tooling.common.commands': w.projectCacheDir + '/Source/commands',
          '@dolittle/tooling.common.common': w.projectCacheDir + '/Source/common',
          '@dolittle/tooling.common.configurations': w.projectCacheDir + '/Source/configurations',
          '@dolittle/tooling.common.dependencies': w.projectCacheDir + '/Source/dependencies',
          '@dolittle/tooling.common.files': w.projectCacheDir + '/Source/files',
          '@dolittle/tooling.common.host': w.projectCacheDir + '/Source/host',
          '@dolittle/tooling.common.logging': w.projectCacheDir + '/Source/logging',
          '@dolittle/tooling.common.packages': w.projectCacheDir + '/Source/packages',
          '@dolittle/tooling.common.plugins': w.projectCacheDir + '/Source/plugins',
          '@dolittle/tooling.common.utilities': w.projectCacheDir + '/Source/utilities'
        });
        process.env.WALLABY_TESTING = true;
        global.expect = chai.expect;
        let should = chai.should();
        global.sinon = require('sinon');
        let sinonChai = require('sinon-chai');
        let chaiAsPromised = require('chai-as-promised');
        chai.use(sinonChai);
        chai.use(chaiAsPromised);

        let winston = require('winston');
        global.logger = winston.createLogger({});
      }
    };
  };