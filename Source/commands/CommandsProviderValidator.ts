/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IProviderFor, ICanValidateProviderFor, ICommand, DuplicateCommandName } from "./index";

/**
 * Represents an implementation of {ICanValidateProviderFor} that validates {ICommand} providers
 *
 * @export
 * @class CommandsProviderValidator
 * @implements {ICanValidateProviderFor}
 * @template T What is provided
 */
export class CommandsProviderValidator implements ICanValidateProviderFor<ICommand> {
    
    validate(provider: IProviderFor<ICommand>) {
        let commands = provider.provide();
        this.throwIfDuplicates(commands);
    }
    private throwIfDuplicates(commands: ICommand[]) {
        let names = commands.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateCommandName(name);
        });
    }
}