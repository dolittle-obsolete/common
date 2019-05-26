/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CacheConfig } from './index';

/**
 * Represents the cached project configuration file for the tooling
 *
 * @export
 * @class ProjectConfig
 * @extends {CacheConfig}
 */
export class ProjectConfig extends CacheConfig {
    /**
     * Instantiates an instance of {ProjectConfig}.
     * @param {string} nodeModulesFolder
     */
    constructor(nodeModulesFolder: string) {
        super('project', nodeModulesFolder, {});
    }
}