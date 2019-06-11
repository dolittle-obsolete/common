/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from "@dolittle/tooling.common.commands";
import { Logger } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { initBoilerplatesSystem, IBoilerplateDiscoverers } from '../index';

const name = 'init';
const description = 'Initializes the boilerplates system';

/**
 * Represents an implementation of {ICommand} for initializing the boilerplates system
 *
 * @export
 * @class InitCommand
 * @extends {Command}
 */
export class InitCommand extends Command {

    /**
     * Instantiates an instance of {InitCommand}.
     */
    constructor(private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _logger: Logger) {
        super(name, description);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'boilerplates init' command`);
        await initBoilerplatesSystem(this._boilerplateDiscoverers, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}