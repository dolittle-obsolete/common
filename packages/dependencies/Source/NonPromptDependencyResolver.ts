/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ICanResolveSyncDependencies, Dependency, IDependenciesManager, MissingDestinationPath, MissingCoreLanguage, CannotResolveDependencyError } from "./internal";
export class NonPromptDependencyResolver implements ICanResolveSyncDependencies {
    
    private _dependenciesManager: IDependenciesManager;
    private _dolittleConfig: any;

    constructor(dependenciesManager: IDependenciesManager, dolittleConfig: any) {
        this._dependenciesManager = dependenciesManager;
        this._dolittleConfig = dolittleConfig;
    }
    resolve(context: any, dependencies: Dependency[], destinationPath?: string, coreLanguage?: string, args?: string[]) {
        if (!destinationPath) throw MissingDestinationPath.new;
        if (!coreLanguage) throw MissingCoreLanguage.new;
        dependencies.forEach(dep => {
            if (!this.canResolve(dep)) throw new CannotResolveDependencyError(`Could not resolve dependency with name '${dep.name}'`);
            context[dep.name] = this._dependenciesManager.discover(dep, destinationPath, coreLanguage, this._dolittleConfig);
        });
        return context;
    }    
    
    canResolve(dependency: Dependency): boolean {
        return dependency.type === 'discover';
    }

}