/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CacheConfig } from './index';

/**
 * Represents a config file that's used as a user cache storage for the tooling. 
 *
 * @export
 * @class UserCacheConfig
 * @extends {CacheConfig}
 */
export class UserCacheConfig<T = unknown> extends CacheConfig<T> {
    static userHomeFolder = '/'
    /**
     * Instantiates an instance of {UserCacheConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {string} nodeModulesFolder The path of the global node_modules folder
     * @param {{[key: string]: any}} defaultObj
     */
    constructor(configName: string, defaultObj: { [key: string]: any; }) {
        super(configName, UserCacheConfig.userHomeFolder, defaultObj);
    }
}