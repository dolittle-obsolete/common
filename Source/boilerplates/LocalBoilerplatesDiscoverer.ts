/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { packageIsCompatible, ILocalPackageDiscoverers } from '@dolittle/tooling.common.packages';
import { IBoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplatesConfig, packageIsBoilerplatePackage, BoilerplatePackage } from './index';

/**
 * Represents an implementation of {ICanDiscoverBoilerplates} for discovering locally installed boilerplates
 */
export class LocalBoilerplatesDiscoverer implements ICanDiscoverBoilerplates {

    private _boilerplatePaths: string[] = [];
    private _discovered: BoilerplatePackage[] = [];

    /**
     * Initializes a new instance of {LocalBoilerplatesDiscoverer}
     * @param {BoilerplatesConfig} _boilerplateConfig
     * @param {IBoilerplatesLoader} _boilerplatesLoader
     * @param {ILocalPackageDiscoverers} _localPackageDiscoverers
     * @param {any} _toolingPackage
     * @param {ILoggers} _logger
     */
    constructor(private _boilerplatesConfig: BoilerplatesConfig, private _boilerplatesLoader: IBoilerplatesLoader, private _localPackageDiscoverers: ILocalPackageDiscoverers, 
        private _toolingPackage: any, private _logger: ILoggers) {}

    get boilerplatePaths() {
        return this._boilerplatePaths;
    }
    
    get discovered() {
        return this._discovered;
    }
    
    async discover() {
        this._boilerplatePaths = [];
        this._discovered = [];
        let discoveredBoilerplatePackages = await this._localPackageDiscoverers.discover(toolingPackage => packageIsBoilerplatePackage(toolingPackage));
        
        let boilerplatesConfigObject: any = {};

        discoveredBoilerplatePackages.forEach( discoveredPackage => {
            let packageFolderPath = discoveredPackage.path;
            let boilerplatePackage = discoveredPackage.package;
            if (packageIsCompatible(boilerplatePackage, this._toolingPackage)) {
                if (boilerplatesConfigObject[boilerplatePackage.name]) {
                    this._logger.warn(`Discovered a boilerplate with an already in-use name '${boilerplatePackage.name}'.`);
                    throw new Error(`Found two boilerplates with the same package name targeting the same tooling version.`);
                }
                this._boilerplatePaths.push(packageFolderPath);
                this._discovered.push({
                    packageJson: boilerplatePackage,
                    boilerplatePackagePath: packageFolderPath
                });
                boilerplatesConfigObject[boilerplatePackage.name] = packageFolderPath;
                this._boilerplatesLoader.needsReload = true;
            }
        });
        if (this._boilerplatesLoader.needsReload) this._boilerplatesConfig.store = boilerplatesConfigObject;
    }

}