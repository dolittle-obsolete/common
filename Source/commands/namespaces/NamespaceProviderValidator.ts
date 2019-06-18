/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor, ICanValidateProviderFor, INamespace, DuplicateNamespaceName, ICommandGroup, DuplicateCommandGroupName, ICommand, DuplicateCommandName } from "../index";

/**
 * Represents an implementation of {ICanValidateProviderFor} that validates {INamespace} providers
 *
 * @export
 * @class NamespaceProviderValidator
 * @implements {ICanValidateProviderFor}
 * @template T What is provided
 */
export class NamespaceProviderValidator implements ICanValidateProviderFor<INamespace> {
    
    validate(provider: IProviderFor<INamespace>) {
        let namespaces = provider.provide();
        
        this.throwIfDuplicates(namespaces);
        namespaces.forEach(this.throwIfInvalidNamespace);
    }

    private throwIfDuplicates(namespaces: INamespace[]) {
        let names = namespaces.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateNamespaceName(name);
        });
    }

    private throwIfInvalidNamespace(namespace: INamespace) {
        this.throwIfDuplicateCommands(namespace.commands);
        this.throwIfInvalidCommandGroups(namespace.commandGroups);
    }
    private throwIfInvalidCommandGroups(commandGroups: ICommandGroup[]) {
        this.throwIfDuplicateCommandGroups(commandGroups);
        commandGroups.forEach(this.throwIfCommandGroupHasDuplicateCommands);
    }
    private throwIfCommandGroupHasDuplicateCommands(commandGroup: ICommandGroup) {
        this.throwIfDuplicateCommands(commandGroup.commands);
    }
    private throwIfDuplicateCommandGroups(commandGroups: ICommandGroup[]) {
        let names = commandGroups.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandGroupName(name);
        });
    }
    private throwIfDuplicateCommands(commands: ICommand[]) {
        let names = commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
}