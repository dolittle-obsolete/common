/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 import { CacheConfig } from './CacheConfig';

/**
 * Represents the tooling project cached project configuration file
 *
 * @export
 * @class ProjectConfig
 * @extends {CacheConfig}
 */
export class ProjectConfig extends CacheConfig {
    constructor() {
        super('project', {
            coreLanguage: 'csharp',
            namespace: 'dolittle'
        });
    }
}