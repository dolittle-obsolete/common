/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from '@dolittle/tooling.common.packages';

/**
 * Represents the combination of the dolittle tooling package configuration and the path to the plugin module file
 *
 * @export
 * @class PluginPackage
 */
export class PluginPackage {

    constructor (packageJson: any, pluginFilePath: string) {
        this.packageJson = packageJson;
        this.pluginFilePath = pluginFilePath;
    }
    /**
     * The path to the plugin js file
     *
     * @type {string}
     */
    readonly pluginFilePath: string;
    readonly packageJson: ToolingPackage;

}
