/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { CacheConfig } from '@dolittle/tooling.common.configurations'

/**
 * Represents the cached boilerplates configuration file for the tooling
 *
 * @export
 * @class BoilerplatesConfig
 * @extends {CacheConfig}
 */
export class BoilerplatesConfig extends CacheConfig {
    /**
     * Creates an instance of {BoilerplatesConfig}.
     * @param {string} nodeModulesFolder
 
     */
    constructor(nodeModulesFolder: string) {
        super('boilerplates', nodeModulesFolder, {});
        CacheConfig
    }
}