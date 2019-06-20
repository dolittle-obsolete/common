
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CommandsProviderValidator, CommandGroupsProviderValidator, NamespaceProviderValidator, ICommand, ICanValidateProviderFor, ICommandGroup, INamespace, ICommandManager, CommandManager, IProviderRegistrators, ProviderRegistrators} from './index';
import { logger } from '@dolittle/tooling.common.logging';

export let commandProviderValidator: ICanValidateProviderFor<ICommand> = new CommandsProviderValidator();
export let commandGroupProviderValidator: ICanValidateProviderFor<ICommandGroup> = new CommandGroupsProviderValidator();
export let namespaceProviderValidator: ICanValidateProviderFor<INamespace> = new NamespaceProviderValidator();

export let commandManager: ICommandManager = new CommandManager(commandProviderValidator, commandGroupProviderValidator, namespaceProviderValidator, logger);
export let providerRegistrators: IProviderRegistrators = new ProviderRegistrators(logger); 