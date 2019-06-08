
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Namespaces, INamespaces, IDefaultCommandGroups, IDefaultCommands, DefaultCommandGroups, DefaultCommands, ICommandManager } from './index';
import { logger } from '@dolittle/tooling.common.logging';
import { CommandManager } from 'CommandManager';

export let commandManager: ICommandManager = new CommandManager(logger);