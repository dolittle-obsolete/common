/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CommandsProviderValidator, CommandGroupsProviderValidator, NamespaceProviderValidator, ICommand, ICanValidateProviderFor, ICommandGroup, INamespace, ICommandManager, CommandManager, IProviderRegistrators, ProviderRegistrators, ICommandExecutor, CommandExecutor, Namespaces, CommandGroups, Commands} from './index';
import { loggers } from '@dolittle/tooling.common.logging';

let commandProviderValidator: ICanValidateProviderFor<ICommand> = new CommandsProviderValidator(loggers);
let commandGroupProviderValidator: ICanValidateProviderFor<ICommandGroup> = new CommandGroupsProviderValidator(loggers);
let namespaceProviderValidator: ICanValidateProviderFor<INamespace> = new NamespaceProviderValidator(loggers);

export let commandManager: ICommandManager = new CommandManager(
    new Namespaces(namespaceProviderValidator, loggers), 
    new CommandGroups(commandGroupProviderValidator, loggers),
    new Commands(commandProviderValidator, loggers), 
    loggers
);
export let commandExecutor: ICommandExecutor = new CommandExecutor(loggers);
export let providerRegistrators: IProviderRegistrators = new ProviderRegistrators(loggers); 