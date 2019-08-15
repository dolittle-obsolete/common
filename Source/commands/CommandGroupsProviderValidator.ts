/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor, ICanValidateProviderFor, ICommandGroup, DuplicateCommandName, DuplicateCommandGroupName } from "./index";
import { ILoggers } from "@dolittle/tooling.common.logging";

/**
 * Represents an implementation of {ICanValidateProviderFor} that validates {ICommandGroup} providers
 *
 * @export
 * @class CommandGroupsProviderValidator
 * @implements {ICanValidateProviderFor}
 * @template T What is provided
 */
export class CommandGroupsProviderValidator implements ICanValidateProviderFor<ICommandGroup> {
    
    /**
     * Instantiates an instance of {CommandGroupsProviderValidator}.
     * @param {ILoggers} _loggers
     */
    constructor(private _loggers: ILoggers) {}

    async validate(provider: IProviderFor<ICommandGroup>) {
        this._loggers.info('Validating command group provider');
        let commandGroups = provider.provide();

        this.throwIfDuplicates(commandGroups);
        await Promise.all(commandGroups.map(_ => this.throwIfCommandGroupHasDuplicateCommands(_)));
        this._loggers.info('Finished validating command group provider');
    }

    private throwIfDuplicates(commandGroups: ICommandGroup[]) {
        let names = commandGroups.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandGroupName(name);
        });
    }

    private async throwIfCommandGroupHasDuplicateCommands(commandGroup: ICommandGroup) {
        let names = (await commandGroup.getCommands()).map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
}