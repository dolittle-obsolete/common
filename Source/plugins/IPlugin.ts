/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideDefaultCommandGroups, ICanProvideDefaultCommands, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';

/**
 * Defines a tooling plugin
 *
 * @export
 * @interface IPlugin
 */
export interface IPlugin {

    /**
     * The default commands provider
     *
     * @type {ICanProvideDefaultCommands}
     */
    defaultCommandsProvider: ICanProvideDefaultCommands
    
    /**
     * The plugin's default command groups provider
     *
     * @type {ICanProvideDefaultCommandGroups}
     */
    defaultCommandGroupsProvider: ICanProvideDefaultCommandGroups

    /**
     * The plugin's namespace provider
     *
     * @type {ICanProvideNamespaces}
     */
    namespaceProvider: ICanProvideNamespaces
}
