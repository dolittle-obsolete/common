/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Command } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers, PromptDependency, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { requireInternet, isGreaterVersion, ToolingPackage, IConnectionChecker, ICanDownloadPackages } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { fetchOnlineBoilerplates, fetchDolittleBoilerplates, OnlineBoilerplatesDiscoverer, OnlineDolittleBoilerplatesFinder, getInstalledBoilerplates, IBoilerplateDiscoverers, askToDownloadOrUpdateBoilerplates, BoilerplatePackageInfo, IBoilerplatesLoader } from '../index';

const name = 'install';
const description = `Prompt to install boilerplates`;

const dolittleBoilerplatesDependency = new PromptDependency(
    'dolittle',
    'Whether to only find boilerplates under the dolittle scope',
    argumentUserInputType,
    'Find only boilerplates under Dolittle scope / user?',
    true
);

/**
 * Represents an implementation of {ICommand} for finding and installing boilerplates 
 *
 * @export
 * @class InstallCommand
 * @extends {Command}
 */
export class InstallCommand extends Command {
    /**
     * Instantiates an instance of {DolittleCommand}.
     */
    constructor(private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _boilerplatesLoader: IBoilerplatesLoader, private _onlineBoilerplatesFinder: OnlineBoilerplatesDiscoverer, private _onlineDolittleBoilerplatesFinder: OnlineDolittleBoilerplatesFinder, 
                private _packageDownloader: ICanDownloadPackages, private _connectionChecker: IConnectionChecker, private _fileSystem: IFileSystem, private _logger: ILoggers) {
        super(name, description, false, undefined, [dolittleBoilerplatesDependency]);
    }

    async action(dependencyResolvers: IDependencyResolvers, cwd: string, coreLanguage: string, commandArguments: string[], commandOptions: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        this._logger.info(`Executing 'boilerplates install' command`);
        await requireInternet(this._connectionChecker, busyIndicator);
        let boilerplates: ToolingPackage[]
        if (commandOptions.get(dolittleBoilerplatesDependency.name)) 
            boilerplates = await fetchDolittleBoilerplates(this._onlineDolittleBoilerplatesFinder, this._connectionChecker, busyIndicator);
        else 
            boilerplates = await fetchOnlineBoilerplates(this._onlineBoilerplatesFinder, this._connectionChecker, busyIndicator, namespace? [namespace] : []);

        let localBoilerplates = await getInstalledBoilerplates(this._boilerplateDiscoverers, this._fileSystem, busyIndicator);
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
        
        outputter.warn(`Found ${upgradeableBoilerplates.length} upgradeable boilerplates`);
        outputter.print(upgradeableBoilerplates.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
            
        let boilerplatesToDownload = newAvailableBoilerplates.concat(<any>upgradeableBoilerplates);
        await askToDownloadOrUpdateBoilerplates(boilerplatesToDownload as BoilerplatePackageInfo[], this._boilerplateDiscoverers, this._boilerplatesLoader,
            dependencyResolvers, this._packageDownloader, this._connectionChecker, busyIndicator);    
    }

    getAllDependencies(cwd: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
    }
}