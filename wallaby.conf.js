/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');

module.exports = function (w) {

  process.env.NODE_PATH += path.delimiter + path.join(w.projectCacheDir, 'Source');
    return {
      files: [
        { pattern: 'node_modules/chai/chai.js'},
        { pattern: 'chai-as-promised/chai-as-promised.js', instrument: false },
        { pattern: 'sinon/pkg/sinon.js', instrument: false },
        { pattern: 'sinon-chai/lib/sinon-chai.js', instrument: false },
        { pattern: 'Source/**/lib', ignore: true },
        { pattern: 'Source/**/for_*/**/*.spec.ts', ignore: true },
        { pattern: 'Source/**/for_*/**/*.given.ts'},
        { pattern: 'Source/**/*.ts' }
      ],
      tests: [
          { pattern: 'Source/**/for_*/**/*.spec.ts'}
      ],
      testFramework: 'mocha',

      env: {
        type: 'node',
        runner: 'node'
      },

      compilers: {
        'Source/**/*.ts': w.compilers.typeScript()
      },
      setup: () => {
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