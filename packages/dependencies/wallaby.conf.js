module.exports = function (w) {
    return {
      files: [,
        '*.ts',
        '**/*.ts'
      ],

      tests: [
        '**/*.js'
      ],
      testFramework: 'mocha',

      env: {
        type: 'node'
      },

      compilers: {
        '**/*.ts?(x)': w.compilers.typeScript()
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