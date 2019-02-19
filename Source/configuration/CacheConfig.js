/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Conf from 'conf';
import path from 'path';

/**
 * Represents a config file that's used as a cache storage for the tooling. 
 * 
 * The configuration file should be stored at the root of the scope folder of the running tooling package.
 *
 * @export
 * @class CacheConfig
 * @extends {Conf}
 */
export class CacheConfig extends Conf {
    /**
     * Creates an instance of {CacheConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {{[key: string]: any}} defaultObj
     * @memberof CacheConfig
     */
    constructor(configName, defaultObj) {
        super({
                projectName: '.dolittle', 
                configName,
                cwd: path.resolve(__dirname,'..'),
                defaults: defaultObj,
                projectSuffix: ''
            });
    }
}