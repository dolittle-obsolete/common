/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBoilerplates, IBoilerplatesLoader, IBoilerplateDiscoverers, initBoilerplatesSystem } from '@dolittle/tooling.common.boilerplates';
import { IPlugins, fetchDolittlePlugins, OnlineDolittlePluginsFinder } from '@dolittle/tooling.common.plugins';
import { IBusyIndicator, NullBusyIndicator, ICanOutputMessages, NullMessageOutputter } from '@dolittle/tooling.common.utilities';
import { INamespace, Namespace, ICommandManager, IProviderRegistrators, ICanProvideCommands, ICanProvideCommandGroups, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { DownloadPackageInfo, IConnectionChecker, ICanDownloadPackages, ILatestCompatiblePackageFinder, isGreaterVersion } from '@dolittle/tooling.common.packages';
import { IDependencyResolvers, dependencyResolvers as _dependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { IInitializer, HostPackage } from './internal';

/**
 * Represents an implementation of {IInitializer}
 *
 * @export
 * @class Initializer
 * @implements {IInitializer}
 */
export class Initializer implements IInitializer {

    private _isInitialized = false;

    constructor(private _providerRegistrators: IProviderRegistrators, private _commandManager: ICommandManager, private _plugins: IPlugins,
                private _boilerplates: IBoilerplates, private _boilerplatesLoader: IBoilerplatesLoader, private _boilerplateDiscoverers: IBoilerplateDiscoverers,
                private _dolittlePluginsFinder: OnlineDolittlePluginsFinder, private _connectionChecker: IConnectionChecker,
                private _latestCompatiblePackageFinder: ILatestCompatiblePackageFinder, private _packageDownloader: ICanDownloadPackages, private _toolingPackage: any, private _logger: ILoggers) {}

    get isInitialized() {
        return this._isInitialized;
    }

    async initialize(hostPackage?: HostPackage, dependencyResolvers: IDependencyResolvers = _dependencyResolvers,
        busyIndicator: IBusyIndicator = new NullBusyIndicator(), outputter: ICanOutputMessages = new NullMessageOutputter()) {
        if (this.isInitialized) {
            this._logger.info('Tooling system already initialized');
        }
        else {
            this._logger.info('Initializing the tooling system');
            if (hostPackage) await this.installDefaultPluginsIfNeeded(hostPackage, busyIndicator, outputter);
            this._providerRegistrators.register();
            await this.providePlugins();
            await this.provideBoilerplateNamespaces();
            this._isInitialized = true;

            this._logger.info('The tooling system has been initialized');
        }
    }

    async reloadPlugins(busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        busyIndicator = busyIndicator.createNew('Reloading plugins');
        try {
            await this.providePlugins();
            await this.provideBoilerplateNamespaces();
        } catch (error) {
            busyIndicator.fail('Could not reload plugins');
            throw new Error(error);
        }
        busyIndicator.succeed('Plugins reloaded');
    }

    async toolingPlatformHasUpdate() {
        const latestCompatibleVersion = (await this._latestCompatiblePackageFinder.find('@dolittle/tooling.common'))?.version!;
        return isGreaterVersion(latestCompatibleVersion, this._toolingPackage.version);
    }

    async updateToolingPlatform() {
        const latestCompatibleVersion = (await this._latestCompatiblePackageFinder.find('@dolittle/tooling.common'))?.version!;
        const shouldUpdate = isGreaterVersion(latestCompatibleVersion, this._toolingPackage.version);
        if (shouldUpdate) {
            this._packageDownloader.downloadSync([
                '@dolittle/tooling.common',
                '@dolittle/tooling.common.boilerplates',
                '@dolittle/tooling.common.commands',
                '@dolittle/tooling.common.configurations',
                '@dolittle/tooling.common.dependencies',
                '@dolittle/tooling.common.files',
                '@dolittle/tooling.common.logging',
                '@dolittle/tooling.common.login',
                '@dolittle/tooling.common.packages',
                '@dolittle/tooling.common.plugins',
                '@dolittle/tooling.common.utilities',
                ].map(_ => {
                    return {
                        name: _,
                        version: latestCompatibleVersion
                    } as DownloadPackageInfo;
                }));
        }
        return shouldUpdate;
    }

    private async installDefaultPluginsIfNeeded(hostPackage: HostPackage, busyIndicator: IBusyIndicator, outputter: ICanOutputMessages) {
        const hostDefaultPlugins = hostPackage.dolittle.host.defaultPlugins;
        if (! await this.hasAllDefaultPlugins(hostDefaultPlugins)) {
            const pluginPackages = await fetchDolittlePlugins(this._dolittlePluginsFinder, this._connectionChecker, busyIndicator);
            const pluginsToDownload = pluginPackages.filter(_ => hostDefaultPlugins.includes(_.name));
            const missingPlugins = hostDefaultPlugins.filter(plugin => !pluginPackages.map(_ => _.name).includes(plugin));
            this._packageDownloader.downloadSync(pluginsToDownload.map(_ => {
                return {
                    name: _.name,
                    version: _.version
                } as DownloadPackageInfo;
            }));
            if (missingPlugins.length > 0) {
                outputter.print('Missing default plugins. Tooling might not function as intended. If this causes problems please report issue at https://github.com/dolittle-tools/common/issues');
                missingPlugins.forEach(_ => outputter.print(`\t${_}`));
            }
            if (pluginsToDownload.length > 0) await initBoilerplatesSystem(this._boilerplateDiscoverers, this._boilerplatesLoader, busyIndicator);
        }
    }

    private async hasAllDefaultPlugins(defaultPlugins: string[]) {
        let discoveredPlugins = await this._plugins.getPluginPackages();
        if (discoveredPlugins.length === 0) {
            await this._plugins.discoverNewPlugins();
            discoveredPlugins = await this._plugins.getPluginPackages();
        }

        return defaultPlugins.every(_ => discoveredPlugins.map(_ => _.packageJson.name).includes(_));
    }

    private async providePlugins() {
        this._logger.info('Providing plugins');
        const loadedPlugins = await this._plugins.getPlugins();
        this._commandManager.clear();
        const providers: {command: ICanProvideCommands[], commandGroup: ICanProvideCommandGroups[], namespace: ICanProvideNamespaces[]} = {command: [], commandGroup: [], namespace: []};

        loadedPlugins.forEach(_ => {
            providers.command.push(_.commandsProvider);
            providers.commandGroup.push(_.commandGroupsProvider);
            providers.namespace.push(_.namespaceProvider);
        });

        await this._commandManager.registerProviders(providers.command, providers.commandGroup, providers.namespace);
        this._logger.info('Plugins provided');
    }

    private async provideBoilerplateNamespaces() {
        this._logger.info('Providing boilerplate namespaces');
        const namespacesToProvide = await this.createNamespacesFromBoilerplates();
        await this._commandManager.registerProviders([], [], [{provide: () => namespacesToProvide}]);
        this._logger.info('Boilerplate namespaces provided');
    }

    private async createNamespacesFromBoilerplates() {
        this._logger.info('Creating namespaces from boilerplates');
        if (this._boilerplatesLoader.needsReload) await this._boilerplatesLoader.load();
        const namespaces = this._commandManager.namespaces;
        const namespaceNames = namespaces.map(_ => _.name);
        const map = new Map<string, INamespace>();
        let boilerplatesWithNamespaces = this._boilerplates.boilerplates.filter(_ => _.namespace !== undefined);
        namespaces.forEach(namespace => {
            if (boilerplatesWithNamespaces.map(_ => _.namespace).includes(namespace.name)) {
                namespace.hasBoilerplates = true;

            }
        });
        boilerplatesWithNamespaces = boilerplatesWithNamespaces.filter(_ => !namespaceNames.includes(_.namespace));
        for (const boilerplate of boilerplatesWithNamespaces) {
            if (!map.has(boilerplate.namespace)) {
                const namespace = new Namespace(boilerplate.namespace, [], [], boilerplate.description);
                namespace.hasBoilerplates = true;
                map.set(boilerplate.namespace, namespace);

                this._logger.info(`Found new boilerplate namespace '${namespace.name}'`);
            }
        }
        const ret: INamespace[] = [];
        for (const entry of map) {
            ret.push(entry[1]);
        }

        this._logger.info('Boilerplate namespaces created');
        return ret;
    }
}
