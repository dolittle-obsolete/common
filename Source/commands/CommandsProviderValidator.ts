/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor, ICanValidateProviderFor, ICommand, DuplicateCommandName } from "./index";
import { ILoggers } from "@dolittle/tooling.common.logging";

/**
 * Represents an implementation of {ICanValidateProviderFor} that validates {ICommand} providers
 *
 * @export
 * @class CommandsProviderValidator
 * @implements {ICanValidateProviderFor}
 * @template T What is provided
 */
export class CommandsProviderValidator implements ICanValidateProviderFor<ICommand> {
    
    /**
     * Instantiates an instance of {CommandsProviderValidator}.
     * @param {ILoggers} _loggers
     */
    constructor(private _loggers: ILoggers) {}
    
    validate(provider: IProviderFor<ICommand>) {
        this._loggers.info('Validating command provider')
        let commands = provider.provide();
        this.throwIfDuplicates(commands);
        this._loggers.info('Finished validating command provider');
        return Promise.resolve();
    }
    private throwIfDuplicates(commands: ICommand[]) {
        let names = commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
}