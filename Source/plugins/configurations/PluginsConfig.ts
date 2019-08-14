/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CacheConfig } from '@dolittle/tooling.common.configurations'

/**
 * Represents the cached plugins configuration file for the tooling
 * 
 * Definition:
 * "<plugin package name>": {
 *      "pluginPath": "<path to module (index, plugin)>",
 *      "packagePath": "<path to package folder>"
 * }
 *
 * @export
 * @class PluginsConfig
 * @extends {CacheConfig}
 */
export class PluginsConfig extends CacheConfig {
    /**
     * Creates an instance of {PluginsConfig}.
     * @param {string} nodeModulesFolder
     * @memberof PluginsConfig
     */
    constructor(nodeModulesFolder: string) {
        super('plugins', nodeModulesFolder, {});
    }
}
