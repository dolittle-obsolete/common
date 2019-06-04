/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICanProvideDefaultCommandGroups, ICanProvideDefaultCommands, ICanProvideNamespaces} from '@dolittle/tooling.common.commands';

export interface IPlugin {
    /**
     * The plugin's default commands provider
     *
     * @type {ICanProvideDefaultCommands}
     * @memberof IPlugin
     */
    defaultCommandsProvider: ICanProvideDefaultCommands
    /**
     * The plugin's default command groups provider
     *
     * @type {ICanProvideDefaultCommandGroups}
     * @memberof IPlugin
     */
    defaultCommandGroupsProvider: ICanProvideDefaultCommandGroups
    /**
     * The plugin's namespace provider
     *
     * @type {ICanProvideNamespaces}
     * @memberof IPlugin
     */
    namespaceProvider: ICanProvideNamespaces
}