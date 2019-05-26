/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { discoverDependencyType, ICanResolveSyncDependencies, IDependency, IDependencyDiscoverResolver, MissingDestinationPath, MissingCoreLanguage, CannotResolveDependencyError } from "./internal";

/**
 * Resolves {DiscoverDependency}
 *
 * @export
 * @class DiscoverDependencyResolver
 * @implements {ICanResolveSyncDependencies}
 */
export class DiscoverDependencyResolver implements ICanResolveSyncDependencies {
    
    constructor(private _discoverResolver: IDependencyDiscoverResolver, private _dolittleConfig: any) {}

    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]) {
        if (!destinationPath) throw MissingDestinationPath.new;
        if (!coreLanguage) throw MissingCoreLanguage.new;
        dependencies.forEach(dep => {
            if (!this.canResolve(dep)) throw new CannotResolveDependencyError(`Could not resolve dependency with name '${dep.name}'`);
            context[dep.name] = this._discoverResolver.resolve(<any>dep, destinationPath, coreLanguage, this._dolittleConfig);
        });
        return context;
    }    
    
    canResolve(dependency: IDependency): boolean {
        return dependency.type === discoverDependencyType && (<any>dependency).userInputType === undefined;
    }
}