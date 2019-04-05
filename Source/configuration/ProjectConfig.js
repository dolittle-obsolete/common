/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CacheConfig } from './CacheConfig';

/**
 * Represents the cached project configuration file for the tooling
 *
 * @export
 * @class ProjectConfig
 * @extends {CacheConfig}
 */
export class ProjectConfig extends CacheConfig {
    /**
     * Creates an instance of {ProjectConfig}.
     * @param {string} nodeModulesFolder
     * @memberof ProjectConfig
     */
    constructor(nodeModulesFolder) {
        super('project', nodeModulesFolder, {});
    }
}