/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor, ICanValidateProviderFor, INamespace, DuplicateNamespaceName, ICommandGroup, DuplicateCommandGroupName, ICommand, DuplicateCommandName } from '../internal';
import { ILoggers } from '@dolittle/tooling.common.logging';

/**
 * Represents an implementation of {ICanValidateProviderFor} that validates {INamespace} providers
 *
 * @export
 * @class NamespaceProviderValidator
 * @implements {ICanValidateProviderFor}
 * @template T What is provided
 */
export class NamespaceProviderValidator implements ICanValidateProviderFor<INamespace> {

    /**
     * Instantiates an instance of {NamespaceProviderValidator}.
     * @param {ILoggers} _loggers
     */
    constructor(private _loggers: ILoggers) {}

    async validate(provider: IProviderFor<INamespace>) {
        this._loggers.info('Validating namespace provider');
        const namespaces = provider.provide();

        this.throwIfDuplicates(namespaces);
        await Promise.all(namespaces.map(_ => this.throwIfInvalidNamespace(_)));
        this._loggers.info('Finished validating namespace provider');
    }

    private throwIfDuplicates(namespaces: INamespace[]) {
        const names = namespaces.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateNamespaceName(name);
        });
    }

    private async throwIfInvalidNamespace(namespace: INamespace) {
        this.throwIfDuplicateCommands(namespace.commands);
        await this.throwIfInvalidCommandGroups(namespace.commandGroups);
    }

    private async throwIfInvalidCommandGroups(commandGroups: ICommandGroup[]) {
        this.throwIfDuplicateCommandGroups(commandGroups);
        await Promise.all(commandGroups.map(_ => this.throwIfCommandGroupHasDuplicateCommands(_)));
    }

    private async throwIfCommandGroupHasDuplicateCommands(commandGroup: ICommandGroup) {
        this.throwIfDuplicateCommands(await commandGroup.getCommands());
    }

    private throwIfDuplicateCommandGroups(commandGroups: ICommandGroup[]) {
        const names = commandGroups.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandGroupName(name);
        });
    }

    private throwIfDuplicateCommands(commands: ICommand[]) {
        const names = commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
}
