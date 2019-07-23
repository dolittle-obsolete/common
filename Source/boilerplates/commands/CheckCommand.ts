/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { IFileSystem } from '@dolittle/tooling.common.files';
import { requireInternet, ILatestCompatiblePackageFinder, IConnectionChecker, ICanDownloadPackages } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { askToDownloadOrUpdateBoilerplates, checkBoilerplates, IBoilerplateDiscoverers, IBoilerplatesLoader } from '../index'

const name = 'check';
const description = `Checks whether you have boilerplates that are out of date.

Lists installed boilerplates that are out of date with the latest version.

Asks whether to download the latest boilerplates or not.`;

const shortDescription = 'Checks whether you have boilerplates that are out of date';

/**
 * Represents an implementation of {ICommand} for checking versions of boilerplates
 *
 * @export
 * @class CheckCommand
 * @extends {Command}
 */
export class CheckCommand extends Command {

    /**
     * Instantiates an instance of {CheckCommand}.
     */
    constructor(private _boilerplatesDiscoverers: IBoilerplateDiscoverers, private _boilerplatesLoader: IBoilerplatesLoader, private _latestPackageFinder: ILatestCompatiblePackageFinder, 
                private _packageDownloader: ICanDownloadPackages, private _connectionChecker: IConnectionChecker, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        super(name, description, false, shortDescription);
    }

    async action(dependencyResolvers: IDependencyResolvers, cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        this._logger.info(`Executing 'boilerplates check' command`);

        await requireInternet(this._connectionChecker, busyIndicator);
        
        let outOfDatePackages = await checkBoilerplates(
            this._boilerplatesDiscoverers, 
            this._latestPackageFinder, 
            this._fileSystem, 
            this._connectionChecker, 
            busyIndicator
        );
        await askToDownloadOrUpdateBoilerplates(
            outOfDatePackages, 
            this._boilerplatesDiscoverers, 
            this._boilerplatesLoader, 
            dependencyResolvers, 
            this._packageDownloader, 
            this._connectionChecker, 
            busyIndicator
        );  
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}