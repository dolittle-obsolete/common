/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { UserCacheConfig } from '@dolittle/tooling.common.configurations';

export type ProjectConfigObject = {
    /**
     * Represents the default core programming language
     *
     * @type {string}
     */
    coreLanguage: string;
}
/**
 * Represents the cached project configuration file for the tooling.
 *
 * @export
 * @class ProjectConfig
 * @extends {UserCacheConfig}
 */
export class ProjectConfig extends UserCacheConfig<ProjectConfigObject> {
    /**
     * Instantiates an instance of {ProjectConfig}.
     */
    constructor() {
        super('project', {});
    }
}