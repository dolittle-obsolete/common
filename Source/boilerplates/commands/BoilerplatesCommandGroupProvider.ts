/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideDefaultCommandGroups, ICommandGroup } from "@dolittle/tooling.common.commands";
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ILoggers } from "@dolittle/tooling.common.logging";
import { ILatestCompatiblePackageFinder } from "@dolittle/tooling.common.packages";
import { BoilerplatesCommandGroup, IBoilerplateDiscoverers, IBoilerplates, OnlineBoilerplatesDiscoverer, OnlineDolittleBoilerplatesFinder, CheckCommand, InitCommand, InstalledCommand, ListCommand, InstallCommand } from "../index";

export class BoilerplatesCommandGroupProvider implements ICanProvideDefaultCommandGroups {

    private _boilerplatesCommandGroup: BoilerplatesCommandGroup

    constructor(boilerplateDiscoverers: IBoilerplateDiscoverers, latestPackageFinder: ILatestCompatiblePackageFinder, boilerplates: IBoilerplates, 
                onlineBoilerplatesFinder: OnlineBoilerplatesDiscoverer, onlineDolittleBoilerplatesFinder: OnlineDolittleBoilerplatesFinder, fileSystem: IFileSystem, logger: ILoggers ) {
        this._boilerplatesCommandGroup = new BoilerplatesCommandGroup([
            new CheckCommand(boilerplateDiscoverers, latestPackageFinder, fileSystem, logger),
            new InitCommand(boilerplateDiscoverers, logger),
            new InstalledCommand(boilerplateDiscoverers, fileSystem, logger),
            new InstallCommand(boilerplateDiscoverers, onlineBoilerplatesFinder, onlineDolittleBoilerplatesFinder, fileSystem, logger),
            new ListCommand(boilerplates, logger),
        ]);
    }
    provide(): ICommandGroup[] { return [this._boilerplatesCommandGroup]; }

}