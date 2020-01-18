/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugin } from '@dolittle/tooling.common.plugins';
import { ICanProvideCommands, ICanProvideCommandGroups, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';

/**
 * Represents an implementation of {IPlugin}
 *
 * @class Plugin
 * @implements {IPlugin}
 */
export class Plugin implements IPlugin {

    constructor(commandsProvider: ICanProvideCommands, commandGroupsProvider: ICanProvideCommandGroups, namespaceProvider: ICanProvideNamespaces) {
        this.commandsProvider = commandsProvider;
        this.commandGroupsProvider = commandGroupsProvider;
        this.namespaceProvider = namespaceProvider;
    }

    readonly commandsProvider: ICanProvideCommands;

    readonly commandGroupsProvider: ICanProvideCommandGroups;

    readonly namespaceProvider: ICanProvideNamespaces;

}
