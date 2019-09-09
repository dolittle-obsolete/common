/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IPlugins } from '@dolittle/tooling.common.plugins';
import { IBoilerplates, IBoilerplatesLoader} from '@dolittle/tooling.common.boilerplates';
import { IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { INamespace, Namespace, ICommandManager, IProviderRegistrators, ICanProvideCommands, ICanProvideCommandGroups, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';
import { ILoggers } from '@dolittle/tooling.common.logging';
import { IInitializer } from './index';

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
        private _boilerplates: IBoilerplates, private _boilerplatesLoader: IBoilerplatesLoader, private _logger: ILoggers) {}
    
    get isInitialized() { 
        return this._isInitialized;
    }

    async initialize(busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        if (this.isInitialized) {
            this._logger.info('Tooling system already initialized');
        }
        else {
            this._logger.info('Initializing the tooling system');
            
            this._providerRegistrators.register();
            await this.providePlugins();
            await this.provideBoilerplateNamespaces();
            this._isInitialized = true;
    
            this._logger.info('Initialized the tooling system');
        }
    }

    async reloadPlugins(busyIndicator: IBusyIndicator) {
        busyIndicator = busyIndicator.createNew('Reloading plugins');
        try {
            await this.providePlugins();
            await this.provideBoilerplateNamespaces();
        } catch(error) {
            busyIndicator.fail('Could not reload plugins');
            throw new Error(error);
        }
        busyIndicator.succeed('Plugins reloaded');
    }

    private async providePlugins() {
        this._logger.info('Providing plugins');
        let loadedPlugins = await this._plugins.getPlugins();
        this._commandManager.clear();
        let providers: {command: ICanProvideCommands[], commandGroup: ICanProvideCommandGroups[], namespace: ICanProvideNamespaces[]} = {command: [], commandGroup: [], namespace: []};

        loadedPlugins.forEach(_ => {
            providers.command.push(_.defaultCommandsProvider);
            providers.commandGroup.push(_.defaultCommandGroupsProvider);
            providers.namespace.push(_.namespaceProvider);
        });

        await this._commandManager.registerProviders(providers.command, providers.commandGroup, providers.namespace);
        this._logger.info('Plugins provided')
    }
    
    private async provideBoilerplateNamespaces() {
        this._logger.info('Providing boilerplate namespaces')
        let namespacesToProvide = await this.createNamespacesFromBoilerplates();
        await this._commandManager.registerProviders([], [], [{provide: () => namespacesToProvide}]);
        this._logger.info('Boilerplate namespaces provided');
    }

    private async createNamespacesFromBoilerplates() {
        this._logger.info('Creating namespaces from boilerplates');
        if (this._boilerplatesLoader.needsReload) await this._boilerplatesLoader.load()
        let namespaces = this._commandManager.namespaces;
        let namespaceNames = namespaces.map(_ => _.name);
        let map = new Map<string, INamespace>();
        let boilerplatesWithNamespaces = this._boilerplates.boilerplates.filter(_ => _.namespace !== undefined);
        namespaces.forEach(namespace => {
            if (boilerplatesWithNamespaces.map(_ => _.namespace).includes(namespace.name)) {
                namespace.hasBoilerplates = true;

            }
        })
        boilerplatesWithNamespaces = boilerplatesWithNamespaces.filter(_ => !namespaceNames.includes(_.namespace));
        for (let boilerplate of boilerplatesWithNamespaces) {
            if (!map.has(boilerplate.namespace)) {
                let namespace = new Namespace(boilerplate.namespace, [], [], boilerplate.description);
                namespace.hasBoilerplates = true;
                map.set(boilerplate.namespace, namespace);

                this._logger.info(`Found new boilerplate namespace '${namespace.name}'`);
            }
        }
        let ret: INamespace[] = [];
        for (let entry of map) {
            ret.push(entry[1]);
        }

        this._logger.info('Boilerplate namespaces created');
        return ret;
    }
}
