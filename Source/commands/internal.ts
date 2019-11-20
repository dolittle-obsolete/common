
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
export * from './CommandContext';

export * from './DuplicateCommandName';
export * from './DuplicateCommandGroupName';
export * from './DuplicateNamespaceName';
export * from './CommandFailed';

export * from './ICommand';
export * from './ICommandGroup';
export * from './IDiscoverableCommandGroup';
export * from './INamespace';

export * from './Command';
export * from './AuthenticatedCommand';
export * from './CommandGroup';
export * from './DiscoverableCommandGroup';
export * from './Namespace';

// execution
export * from './execution/IFailedCommandOutputter';
export * from './execution/ICommandExecutor';

export * from './execution/NullFailedCommandOutputter';
export * from './execution/CommandExecutor';

// providing
export * from './providing/IProviderFor';
export * from './providing/IProviderRegistrators';
export * from './providing/ICanValidateProviderFor';
export * from './providing/ICanRegisterProviders';
export * from './providing/ICanProvideCommands';
export * from './providing/ICanProvideCommandGroups';
export * from './providing/ICanProvideNamespaces';
export * from './providing/ICanManageProvidersFor';

export * from './providing/NamespaceProviderValidator';
export * from './providing/CommandsProviderValidator';
export * from './providing/CommandGroupsProviderValidator';
export * from './providing/ProviderRegistrators';

// management
export * from './management/ICommands';
export * from './management/ICommandGroups';
export * from './management/INamespaces';
export * from './management/ICommandManager';

export * from './management/Commands';
export * from './management/CommandGroups';
export * from './management/Namespaces';
export * from './management/CommandManager';