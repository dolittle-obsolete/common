/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { FileSystem } from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import { requireInternet, isGreaterVersion } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { fetchDolittleBoilerplates, OnlineDolittleBoilerplatesFinder, getInstalledBoilerplates, IBoilerplateDiscoverers, askToDownloadOrUpdateBoilerplates, BoilerplatePackageInfo } from '../index';

const name = 'dolittle';
const description = `Lists Dolittle's boilerplates found on npm`;

/**
 * Represents an implementation of {ICommand} for finding Dolittle boilerplates online 
 *
 * @export
 * @class DolittleCommand
 * @extends {Command}
 */
export class DolittleCommand extends Command {
    /**
     * Instantiates an instance of {DolittleCommand}.
     */
    constructor(private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _dependencyResolvers: IDependencyResolvers, private _onlineBoilerplatesFinder: OnlineDolittleBoilerplatesFinder, 
                private _fileSystem: FileSystem, private _logger: Logger) {
        super(name, description);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        this._logger.info(`Executing 'boilerplates dolittle' command`);
        await requireInternet(busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop()

        let boilerplates = await fetchDolittleBoilerplates(this._onlineBoilerplatesFinder, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let localBoilerplates = await getInstalledBoilerplates(this._boilerplateDiscoverers, this._fileSystem, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let newAvailableBoilerplates = boilerplates.filter(boilerplate => !localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name));
        let upgradeableBoilerplates = boilerplates.filter(boilerplate => localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name))
            .map(boilerplate => {
                let localBoilerplate = localBoilerplates.find(_ => _.packageJson.name === boilerplate.name);
                if (localBoilerplate) {
                    return {name: boilerplate.name, version: boilerplate.version, localVersion: localBoilerplate.packageJson.version};
                }
                return undefined;
            })
            .filter(_ => _ && isGreaterVersion(_.version, _.localVersion));
        
        outputter.warn(`Found ${newAvailableBoilerplates.length} new boilerplates`);
        outputter.print(newAvailableBoilerplates.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        outputter.warn(`Found ${upgradeableBoilerplates.length} upgradeble boilerplates`);
        outputter.print(upgradeableBoilerplates.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
            
        let boilerplatesToDownload = newAvailableBoilerplates.concat(<any>upgradeableBoilerplates);
        await askToDownloadOrUpdateBoilerplates(boilerplatesToDownload as BoilerplatePackageInfo[], this._boilerplateDiscoverers,
            this._dependencyResolvers, busyIndicator);    
        if (busyIndicator.isBusy) busyIndicator.stop();
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
    
}