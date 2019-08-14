/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugin } from "../index";

/**
 * Defines the configuration of the actual dolittle tooling plugin module. This means that the plugin package module must expose this configuration
 */
export type PluginModule = {
    plugin: IPlugin
}
