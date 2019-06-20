/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { initPluginSystem, IPlugins } from '@dolittle/tooling.common.plugins';
import {initBoilerplatesSystem, IBoilerplateDiscoverers, IBoilerplates} from '@dolittle/tooling.common.boilerplates';
import { IBusyIndicator, NullBusyIndicator } from '@dolittle/tooling.common.utilities';
import { INamespace, Namespace, ICommandManager, IProviderRegistrators, ICanProvideDefaultCommands, ICanProvideDefaultCommandGroups, ICanProvideNamespaces } from '@dolittle/tooling.common.commands';
import { Logger } from '@dolittle/tooling.common.logging';
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
    
    constructor(private _providerRegistrators: IProviderRegistrators, private _commandManager: ICommandManager, private _plugins: IPlugins, private _boilerplates: IBoilerplates, 
        private _boilerplateDiscoverers: IBoilerplateDiscoverers, private _logger: Logger) {}
    
        get isInitialized() { return this._isInitialized; }

    async initialize(busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        if (this.isInitialized) {
            this._logger.info('Tooling system already initialized');
        }
        else {
            this._logger.info('Initializing the tooling system');
            
            await initPluginSystem(this._plugins, busyIndicator);
            await initBoilerplatesSystem(this._boilerplateDiscoverers, busyIndicator);
            
            this._providerRegistrators.register();
            this.providePlugins();
            this.provideBoilerplateNamespaces();
            this._isInitialized = true;
    
            this._logger.info('Initialized the tooling system');
        }
    }

    private async providePlugins() {
        let loadedPlugins = await this._plugins.getPlugins();
        this._commandManager.clear();
        let providers: {command: ICanProvideDefaultCommands[], commandGroup: ICanProvideDefaultCommandGroups[], namespace: ICanProvideNamespaces[]} = {command: [], commandGroup: [], namespace: []};

        loadedPlugins.forEach(_ => {
            providers.command.push(_.defaultCommandsProvider);
            providers.commandGroup.push(_.defaultCommandGroupsProvider);
            providers.namespace.push(_.namespaceProvider);
        });

        this._commandManager.registerProviders(providers.command, providers.commandGroup, providers.namespace);
    }
    
    private provideBoilerplateNamespaces() {
        let namespacesToProvide = this.createNamespacesFromBoilerplates();
        this._commandManager.registerProviders([], [], [{provide: () => namespacesToProvide}]);
    }

    private createNamespacesFromBoilerplates() {
        let namespaceNames = this._commandManager.namespaces.map(_ => _.name);
        let map = new Map<string, INamespace>();
        let boilerplatesWithNamespaces = this._boilerplates.boilerplates.filter(_ => _.namespace !== undefined);
        boilerplatesWithNamespaces = boilerplatesWithNamespaces.filter(_ => !namespaceNames.includes(_.namespace));
        for (let boilerplate of boilerplatesWithNamespaces) {
            if (!map.has(boilerplate.namespace)) {
                map.set(boilerplate.namespace, new Namespace(boilerplate.namespace, [], [], boilerplate.description));
            }
        }
        let ret: INamespace[] = [];
        for (let entry of map) {
            ret.push(entry[1]);
        }
        return ret;
    }
}
