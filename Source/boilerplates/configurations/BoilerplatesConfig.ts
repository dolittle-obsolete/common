/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { GlobalCacheConfig } from "@dolittle/tooling.common.configurations";

/**
 * Represents the cached boilerplates configuration file for the tooling
 *
 * @export
 * @class BoilerplatesConfig
 * @extends {GlobalCacheConfig}
 */
export class BoilerplatesConfig extends GlobalCacheConfig {
    
    /**
     * Instantiates an instance of {BoilerplatesConfig}.
     */
    constructor() {
        super('boilerplates', {});
    }
}