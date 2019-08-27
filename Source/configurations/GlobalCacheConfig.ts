/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from 'path';
import { CacheConfig } from './index';

/**
 * Represents a config file that's used as a global cache storage for the tooling. 
 *
 * @export
 * @class GlobalCacheConfig
 * @extends {CacheConfig}
 */
export class GlobalCacheConfig extends CacheConfig {
    static nodeModulesFolder = '/';
    /**
     * Instantiates an instance of {GlobalCacheConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {string} nodeModulesFolder The path of the global node_modules folder
     * @param {{[key: string]: any}} defaultObj
     */
    constructor(configName: string, defaultObj: { [key: string]: any; }) {
        super(configName, path.join(GlobalCacheConfig.nodeModulesFolder, '@dolittle'), defaultObj);
    }
}