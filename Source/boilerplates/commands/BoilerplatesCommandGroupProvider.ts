/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideDefaultCommandGroups, ICommandGroup } from "@dolittle/tooling.common.commands";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { FileSystem } from "@dolittle/tooling.common.files";
import { Logger } from "@dolittle/tooling.common.logging";
import { ILatestCompatiblePackageFinder } from "@dolittle/tooling.common.packages";
import { BoilerplatesCommandGroup, IBoilerplateDiscoverers, IBoilerplates, OnlineBoilerplatesDiscoverer, OnlineDolittleBoilerplatesFinder, CheckCommand, DolittleCommand, InitCommand, InstalledCommand, ListCommand, OnlineCommand } from "../index";

export class BoilerplatesCommandGroupProvider implements ICanProvideDefaultCommandGroups {

    private _boilerplatesCommandGroup: BoilerplatesCommandGroup
    

    constructor(boilerplateDiscoverers: IBoilerplateDiscoverers, dependencyResolvers: IDependencyResolvers, latestPackageFinder: ILatestCompatiblePackageFinder, boilerplates: IBoilerplates, 
                onlineBoilerplatesFinder: OnlineBoilerplatesDiscoverer, onlineDolittleBoilerplatesFinder: OnlineDolittleBoilerplatesFinder, fileSystem: FileSystem, logger: Logger ) {
        this._boilerplatesCommandGroup = new BoilerplatesCommandGroup([
            new CheckCommand(boilerplateDiscoverers, latestPackageFinder, fileSystem, logger),
            new DolittleCommand(boilerplateDiscoverers, onlineDolittleBoilerplatesFinder, fileSystem, logger),
            new InitCommand(boilerplateDiscoverers, logger),
            new InstalledCommand(boilerplateDiscoverers, fileSystem, logger),
            new ListCommand(boilerplates, logger),
            new OnlineCommand(onlineBoilerplatesFinder, boilerplateDiscoverers, fileSystem, logger)
        ]);
    }
    provide(): ICommandGroup[] { return [this._boilerplatesCommandGroup]; }

}