/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Conf from 'conf';
import path from 'path';

/**
 * Represents a config file that's used as a cache storage for the tooling.
 *
 * @export
 * @class CacheConfig
 * @extends {Conf}
 */
export abstract class CacheConfig<T = unknown> extends Conf<T> {

    /**
     * Instantiates an instance of {CacheConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {string} folder The path of the folder
     * @param {{[key: string]: any}} defaultObj
     */
    constructor(configName: string, folder: string, defaultObj: { [key: string]: any; }) {
        super({
            projectName: '.dolittle',
            configName,
            cwd: path.join(folder, '.dolittle'),
            defaults: defaultObj,
            projectSuffix: ''
        });
    }
}
