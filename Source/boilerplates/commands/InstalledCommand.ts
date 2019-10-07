/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command, CommandContext, IFailedCommandOutputter } from "@dolittle/tooling.common.commands";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from "@dolittle/tooling.common.utilities";
import { getInstalledBoilerplates, IBoilerplateDiscoverers } from "../internal";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";

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
    constructor(private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        super(name, description, false);
    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._logger.info(`Executing 'boilerplates installed' command`);
        let boilerplates = await getInstalledBoilerplates(this._boilerplateDiscoverers, this._fileSystem, busyIndicator)
            .catch((error: Error) => {
                if (busyIndicator.isBusy) busyIndicator.stop();
                outputter.warn('An error occured while getting the installed boilerplates.\nError message:');
                outputter.error(error.message);
                outputter.warn('The problem might be that you haven\'t initialized the tooling');
                return [];
            });
        boilerplates.forEach(_ => outputter.print(`${_.packageJson.name}@${_.packageJson.version}`));
    }

}
