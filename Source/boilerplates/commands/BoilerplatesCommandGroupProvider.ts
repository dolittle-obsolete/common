/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanProvideCommandGroups, ICommandGroup } from '@dolittle/tooling.common.commands';
import { IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ILatestCompatiblePackageFinder, ICanDownloadPackages, IConnectionChecker } from '@dolittle/tooling.common.packages';
import { BoilerplatesCommandGroup, IBoilerplateDiscoverers, IBoilerplates, OnlineBoilerplatesDiscoverer, OnlineDolittleBoilerplatesFinder, CheckCommand, InitCommand, InstalledCommand, ListCommand, InstallCommand, IBoilerplatesLoader } from '../internal';

export class BoilerplatesCommandGroupProvider implements ICanProvideCommandGroups {

    private _boilerplatesCommandGroup: BoilerplatesCommandGroup;

    constructor(boilerplateDiscoverers: IBoilerplateDiscoverers, boilerplatesLoader: IBoilerplatesLoader, latestPackageFinder: ILatestCompatiblePackageFinder, boilerplates: IBoilerplates,
                onlineBoilerplatesFinder: OnlineBoilerplatesDiscoverer, onlineDolittleBoilerplatesFinder: OnlineDolittleBoilerplatesFinder,
                packageDownloader: ICanDownloadPackages, connectionChecker: IConnectionChecker, fileSystem: IFileSystem, logger: ILoggers ) {
        this._boilerplatesCommandGroup = new BoilerplatesCommandGroup([
            new CheckCommand(boilerplateDiscoverers, boilerplatesLoader, latestPackageFinder, packageDownloader, connectionChecker, fileSystem, logger),
            new InitCommand(boilerplateDiscoverers, boilerplatesLoader, logger),
            new InstalledCommand(boilerplateDiscoverers, fileSystem, logger),
            new InstallCommand(boilerplateDiscoverers, boilerplatesLoader, onlineBoilerplatesFinder, onlineDolittleBoilerplatesFinder, packageDownloader, connectionChecker, fileSystem, logger),
            new ListCommand(boilerplates, logger),
        ]);
    }
    provide(): ICommandGroup[] { return [this._boilerplatesCommandGroup]; }

}
