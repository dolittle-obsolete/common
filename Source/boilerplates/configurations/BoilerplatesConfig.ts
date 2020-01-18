/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { GlobalCacheConfig } from '@dolittle/tooling.common.configurations';

/**
 * Represents the cached boilerplates configuration file for the tooling.
 *
 * Key is the name of the boilerplate package.
 * Value is the path to the folder of the boilerplate
 *
 * @export
 * @class BoilerplatesConfig
 * @extends {GlobalCacheConfig}
 */
export class BoilerplatesConfig extends GlobalCacheConfig<string> {

    /**
     * Instantiates an instance of {BoilerplatesConfig}.
     */
    constructor() {
        super('boilerplates', {});
    }
}
