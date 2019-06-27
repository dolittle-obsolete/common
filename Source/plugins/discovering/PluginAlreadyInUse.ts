/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when multiple plugins with the same name are loaded into the plugins configuration
 *
 * @export
 * @class PluginAlreadyInUse
 * @extends {Exception}
 */
export class PluginAlreadyInUse extends Exception {
    
    /**
     * Instantiates an instance of {PluginAlreadyInUse}.
     * @param {string} pluginName
     */
    constructor(pluginName: string) {
        super(`Found multiple plugins with the same name '${pluginName}'`);
    }
}