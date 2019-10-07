/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GlobalCacheConfig } from '@dolittle/tooling.common.configurations'

export type PluginConfigObject = {
    /**
     * The path to the runnable plugin file
     *
     * @type {string}
     */
    pluginPath: string,

    /**
     * The path to the actual folder of the plugin package
     *
     * @type {string}
     */
    packagePath: string
}

/**
 * Represents the cached plugins configuration file for the tooling.
 * 
 * Key is the name of the plugin package
 *
 * @export
 * @class PluginsConfig
 * @extends {GlobalCacheConfig}
 */
export class PluginsConfig extends GlobalCacheConfig<PluginConfigObject>
{
    /**
     * Creates an instance of {PluginsConfig}.
     */
    constructor() {
        super('plugins', {});
    }
}