/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, ICommandManager, ICanProvideDefaultCommandGroups } from "@dolittle/tooling.common.commands";
import { BoilerplatesCommandGroupProvider, IBoilerplateDiscoverers, IBoilerplates, OnlineBoilerplatesDiscoverer, OnlineDolittleBoilerplatesFinder, IBoilerplatesLoader } from "../index";
import { ILatestCompatiblePackageFinder, IConnectionChecker, ICanDownloadPackages } from "@dolittle/tooling.common.packages";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";


/**
 * Represents an implementation of {ICanRegisterProviders}
 *
 * @export
 * @class ProviderRegistrator
 * @implements {ICanRegisterProviders}
 */
export class ProviderRegistrator implements ICanRegisterProviders {
    
    private _commandGroupProviders: ICanProvideDefaultCommandGroups[] = [];

    constructor(private _commandManager: ICommandManager, boilerplateDiscoverers: IBoilerplateDiscoverers, boilerplatesLoader: IBoilerplatesLoader, latestPackageFinder: ILatestCompatiblePackageFinder, 
        boilerplates: IBoilerplates, onlineBoilerplatesFinder: OnlineBoilerplatesDiscoverer, onlineDolittleBoilerplatesFinder: OnlineDolittleBoilerplatesFinder, 
        packageDownloader: ICanDownloadPackages, connectionChecker: IConnectionChecker, filesystem: IFileSystem, logger: ILoggers) {
        this._commandGroupProviders.push(new BoilerplatesCommandGroupProvider(
            boilerplateDiscoverers, 
            boilerplatesLoader, 
            latestPackageFinder, 
            boilerplates, 
            onlineBoilerplatesFinder, 
            onlineDolittleBoilerplatesFinder, 
            packageDownloader,
            connectionChecker,
            filesystem,
            logger
        ));
    }

    register() {
        this._commandManager.registerDefaultProviders([], this._commandGroupProviders, [])
    }

}