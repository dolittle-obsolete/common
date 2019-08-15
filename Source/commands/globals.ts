/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CommandsProviderValidator, CommandGroupsProviderValidator, NamespaceProviderValidator, ICommand, ICanValidateProviderFor, ICommandGroup, INamespace, ICommandManager, CommandManager, IProviderRegistrators, ProviderRegistrators} from './index';
import { loggers } from '@dolittle/tooling.common.logging';

export let commandProviderValidator: ICanValidateProviderFor<ICommand> = new CommandsProviderValidator(loggers);
export let commandGroupProviderValidator: ICanValidateProviderFor<ICommandGroup> = new CommandGroupsProviderValidator(loggers);
export let namespaceProviderValidator: ICanValidateProviderFor<INamespace> = new NamespaceProviderValidator(loggers);

export let commandManager: ICommandManager = new CommandManager(commandProviderValidator, commandGroupProviderValidator, namespaceProviderValidator, loggers);
export let providerRegistrators: IProviderRegistrators = new ProviderRegistrators(loggers); 