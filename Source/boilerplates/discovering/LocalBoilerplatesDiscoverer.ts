/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { packageIsCompatible, ILocalPackageDiscoverers, DiscoveredToolingPackage } from '@dolittle/tooling.common.packages';
import { IPluginLoader, PluginPackage } from '@dolittle/tooling.common.plugins';
import path from 'path';
import { IBoilerplatesLoader, ICanDiscoverBoilerplates, BoilerplatesConfig, packageIsBoilerplatePackage, BoilerplatePackage } from '../internal';
import { IFileSystem } from '@dolittle/tooling.common.files';

const pluginBoilerplatesFolderNames = [
    'boilerplates',
    'Boilerplates'
];
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
    constructor(private _boilerplatesConfig: BoilerplatesConfig, private _pluginsLoader: IPluginLoader, private _boilerplatesLoader: IBoilerplatesLoader,
        private _localPackageDiscoverers: ILocalPackageDiscoverers, private _fileSystem: IFileSystem, private _toolingPackage: any, private _logger: ILoggers) {}

    get boilerplatePaths() {
        return this._boilerplatePaths;
    }

    get discovered() {
        return this._discovered;
    }

    async discover(folder?: string) {
        this._boilerplatePaths = [];
        this._discovered = [];
        const discoveredBoilerplatePackages = await this._localPackageDiscoverers.discover(folder, toolingPackage => packageIsBoilerplatePackage(toolingPackage));
        if (this._pluginsLoader.needsReload) await this._pluginsLoader.load();
        discoveredBoilerplatePackages.push(...(await this.discoverFromPlugins(this._pluginsLoader.pluginPackages)));
        const boilerplatesConfigObject: any = {};

        discoveredBoilerplatePackages.forEach( discoveredPackage => {
            const packageFolderPath = discoveredPackage.path;
            const boilerplatePackage = discoveredPackage.package;
            if (packageIsCompatible(boilerplatePackage, this._toolingPackage)) {
                if (boilerplatesConfigObject[boilerplatePackage.name]) {
                    this._logger.warn(`Discovered a boilerplate with an already in-use name '${boilerplatePackage.name}'.`);
                    throw new Error('Found two boilerplates with the same package name targeting the same tooling version.');
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
    private async discoverFromPlugins(pluginPackages: PluginPackage[]) {
        const packages: DiscoveredToolingPackage[] = [];
        for (const plugin of pluginPackages) {
            for (const folderName of pluginBoilerplatesFolderNames) {
                const boilerplatesFolder = path.join(plugin.pluginFilePath, '..', '..', folderName );
                if ((await this._fileSystem.exists(boilerplatesFolder)) && (await this._fileSystem.stat(boilerplatesFolder)).isDirectory()) {
                    packages.push(... (await this._localPackageDiscoverers.discover(boilerplatesFolder, toolingPackage => packageIsBoilerplatePackage(toolingPackage))));
                    break;
                }
            }
        }
        return packages;
    }
}
