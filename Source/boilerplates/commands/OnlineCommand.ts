/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {Command} from '@dolittle/tooling.common.commands';
import { FileSystem } from '@dolittle/tooling.common.files';
import { requireInternet, isGreaterVersion } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, NullMessageOutputter, IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { fetchOnlineBoilerplates, OnlineBoilerplatesDiscoverer, getInstalledBoilerplates, IBoilerplateDiscoverers, askToDownloadOrUpdateBoilerplates } from '../index';
import { BoilerplatePackageInfo } from 'online';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { Logger } from '@dolittle/tooling.common.logging';

const name = 'online';
const description = 'Finds boilerplates on npmjs';

/**
 * Represents an implementation of {ICommand} for finding online boilerplates
 *
 * @export
 * @class OnlineCommand
 * @extends {Command}
 */
export class OnlineCommand extends Command {

    /**
     * Instantiates an instance of {OnlineCommand}.
     * @memberof Online
     */
    constructor(private _boilerplateFinder: OnlineBoilerplatesDiscoverer, private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _dependencyResolvers: IDependencyResolvers, 
                private _fileSystem: FileSystem, private _logger: Logger) {
        super(name, description);
    }

    async action(cwd: string, coreLanguage: string, commandArguments?: string[], namespace?: string, 
                outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        this._logger.info(`Executing 'boilerplates dolittle' command`);
        await requireInternet(busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        // let keywords = parserResult.getCommandArgs();
        // let limit = parserResult.extraOpts['l']? parserResult.extraOpts['l'] : parserResult.extraOpts['limit'];

        let boilerplates = await fetchOnlineBoilerplates(this._boilerplateFinder, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let localBoilerplates = await getInstalledBoilerplates(this._boilerplateDiscoverers, this._fileSystem, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        let newAvailableBoilerplates = boilerplates.filter(boilerplate => !localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name));
        let upgradeableBoilerplates = boilerplates.filter(boilerplate => localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name))
            .map(boilerplate => {
                let localBoilerplate = localBoilerplates.find(_ => _.packageJson.name === boilerplate.name);
                if (localBoilerplate) {
                    return {name: boilerplate.name, version:boilerplate.version, localVersion: localBoilerplate.packageJson.version};
                } 
                return undefined
            })
            .filter(_ => _ && isGreaterVersion(_.localVersion, _.version));

        
        outputter.warn(`Found ${newAvailableBoilerplates.length} new boilerplates`);
        outputter.print(newAvailableBoilerplates.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        outputter.warn(`Found ${upgradeableBoilerplates.length} upgradeble boilerplates`);
        outputter.print(upgradeableBoilerplates.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
        
        let boilerplatesToDownload = newAvailableBoilerplates.concat(<any>upgradeableBoilerplates);
        await askToDownloadOrUpdateBoilerplates(boilerplatesToDownload as BoilerplatePackageInfo[], this._boilerplateDiscoverers, this._dependencyResolvers, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
          
    }
}
