"use strict";


module.exports = (config) => {
    config.set({
        frameworks: ['mocha', 'chai', 'chai-as-promised'],
        
        files: [
            '**/*.ts'
        ]
    })
};