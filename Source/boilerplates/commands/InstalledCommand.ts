/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from "@dolittle/tooling.common.commands";
import { FileSystem } from "@dolittle/tooling.common.files";
import { Logger } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { getInstalledBoilerplates, IBoilerplateDiscoverers } from "../index";

const name = 'installed';
const description = 'Lists installed boilerplates';

/**
 * Represents an implementation of {ICommand} for listing the installed boilerplates
 *
 * @export
 * @class InstalledCommand
 * @extends {Command}
 */
export class InstalledCommand extends Command {
    
    /**
     * Instantiates an instance of {InstalledCommand}.
     */
    constructor(private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _fileSystem: FileSystem, private _logger: Logger) {
        super(name, description);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'boilerplates installed' command`);
        let boilerplates = await getInstalledBoilerplates(this._boilerplateDiscoverers, this._fileSystem, busyIndicator)
            .catch((error: Error) => {
                if (busyIndicator.isBusy) busyIndicator.stop();
                outputter.warn('An error occured while getting the installed boilerplates.\nError message:');
                outputter.error(error.message);
                outputter.warn('The problem might be that you haven\'t initialized the tooling');
                return [];
            });
        if (busyIndicator.isBusy) busyIndicator.stop();
        boilerplates.forEach(_ => outputter.print(`${_.packageJson.name}@${_.packageJson.version}`));
    }
}