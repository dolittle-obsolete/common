/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanRegisterProviders, ICommandManager, ICanProvideDefaultCommandGroups } from "@dolittle/tooling.common.commands";
import { BoilerplatesCommandGroupProvider, IBoilerplateDiscoverers, IBoilerplates, OnlineBoilerplatesDiscoverer, OnlineDolittleBoilerplatesFinder } from "../index";
import { ILatestCompatiblePackageFinder } from "@dolittle/tooling.common.packages";
import { FileSystem } from "@dolittle/tooling.common.files";
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

    constructor(private _commandManager: ICommandManager, boilerplateDiscoverers: IBoilerplateDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder, 
        boilerplates: IBoilerplates, onlineBoilerplatesFinder: OnlineBoilerplatesDiscoverer, onlineDolittleBoilerplatesFinder: OnlineDolittleBoilerplatesFinder, 
        filesystem: FileSystem, logger: ILoggers) {
        this._commandGroupProviders.push(new BoilerplatesCommandGroupProvider(
            boilerplateDiscoverers, latestPackageFinder, boilerplates, onlineBoilerplatesFinder, onlineDolittleBoilerplatesFinder, filesystem, logger
        ));
    }

    register() {
        this._commandManager.registerDefaultProviders([], this._commandGroupProviders, [])
    }

}