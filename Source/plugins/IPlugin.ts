/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideCommandGroups, ICanProvideCommands, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';

/**
 * Defines a tooling plugin
 *
 * @export
 * @interface IPlugin
 */
export interface IPlugin {

    /**
     * The commands provider
     *
     * @type {ICanProvideCommands}
     */
    commandsProvider: ICanProvideCommands

    /**
     * The plugin's command groups provider
     *
     * @type {ICanProvideDefaultCommandGroups}
     */
    commandGroupsProvider: ICanProvideCommandGroups

    /**
     * The plugin's namespace provider
     *
     * @type {ICanProvideNamespaces}
     */
    namespaceProvider: ICanProvideNamespaces
}
