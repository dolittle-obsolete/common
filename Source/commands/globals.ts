
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { logger } from '@dolittle/tooling.common.logging';
import { ICommandManager, CommandManager, CommandsProviderValidator, CommandGroupsProviderValidator, NamespaceProviderValidator } from './index';

let commandProviderValidator = new CommandsProviderValidator();
let commandGroupProviderValidator = new CommandGroupsProviderValidator();
let namespaceProviderValidator = new NamespaceProviderValidator();
export let commandManager: ICommandManager = new CommandManager(commandProviderValidator, commandGroupProviderValidator, namespaceProviderValidator, logger);