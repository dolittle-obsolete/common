/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from "@dolittle/tooling.common.commands";
import { Logger } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { getPluginsInUse, IPlugins } from "../index";

const name = 'list';
const description = 'Lists the plugins in use by the tooling';

/**
 * Represents an implementation of {ICommand} for listing plugins in use by the tooling
 *
 * @export
 * @class ListCommand
 * @extends {Command}
 */
export class ListCommand extends Command {

    /**
     * Instantiates an instance of {ListCommand}
     */
    constructor(private _plugins: IPlugins, private _logger: Logger) {
        super(name, description);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'plugins list' command`);
        let pluginsInUse = await getPluginsInUse(this._plugins, busyIndicator)
            .catch((error: Error) => {
                outputter.warn('An error occured while getting the used plugins.\nError message:');
                outputter.error(error.message);
                outputter.warn('There problem might be that you haven\'t initialized the tooling');
                return [];
        });
        if (busyIndicator.isBusy) busyIndicator.stop();

        pluginsInUse.forEach(_ => outputter.print(`${_.name} - ${_.description}`));
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}