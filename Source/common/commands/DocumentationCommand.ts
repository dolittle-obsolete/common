/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from "@dolittle/tooling.common.commands";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { IDependencyResolvers, IDependency } from "@dolittle/tooling.common.dependencies";
import open from 'open';

const name = 'documentation';
const description = 'Opens up the dolittle documentation site in default browser';

/**
 * Represents an implementation of {ICommand} for opening up dolittle documentation
 *
 * @export
 * @class InitCommand
 * @extends {Command}
 */
export class DocumentationCommand extends Command {

    /**
     * Instantiates an instance of {DocumentationCommand}.
     */
    constructor(private _logger: ILoggers) {
        super(name, description, false);
    }

    async action(dependencyResolvers: IDependencyResolvers, cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'documentation' command`);
        await open('https://www.dolittle.io');
        
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string): IDependency[] {
        return this.dependencies;
    }
}
