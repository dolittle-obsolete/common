/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 import { CacheConfig } from './CacheConfig';

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
     * @memberof BoilerplatesConfig
     */
    constructor(nodeModulesFolder) {
        super('boilerplates', nodeModulesFolder, {});
    }
}