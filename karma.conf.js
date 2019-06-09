"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


module.exports = (config) => {
    config.set({
        frameworks: ['mocha', 'chai', 'chai-as-promised'],
        
        files: [
            'Source/**/*.ts'
        ]
    })
};