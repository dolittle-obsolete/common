/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { dependencyIsDiscoverDependency, IDependency, IDependencyDiscoverResolver, MissingDestinationPath, MissingCoreLanguage, CannotResolveDependency, ICanResolveDependencies, IDependencyRuleFor, RuleNotRespected } from '../internal';

/**
 * Represents an implementation of {ICanResolveDependencies} that resolves {DiscoverDependency}
 *
 * @export
 * @class DiscoverDependencyResolver
 * @implements {ICanResolveDependencies}
 */
export class DiscoverDependencyResolver implements ICanResolveDependencies {
    /**
     * Instantiates an instance of {DiscoverDependencyResolver}.
     * @param {IDependencyDiscoverResolver} _discoverResolver
     * @param {*} _dolittleConfig
     */
    constructor(private _discoverResolver: IDependencyDiscoverResolver, private _dolittleConfig: any) {}

    async resolve(context: any, dependencies: IDependency[], additionalRules: IDependencyRuleFor<IDependency>[], destinationPath?: string, coreLanguage?: string) {
        if (!destinationPath) throw new MissingDestinationPath();
        if (!coreLanguage) throw new MissingCoreLanguage();

        dependencies.forEach(dep => {
            if (!this.canResolve(dep)) throw new CannotResolveDependency(dep);
            context[dep.name] = this._discoverResolver.resolve(dep as any, destinationPath, coreLanguage, this._dolittleConfig);
        });
        for (const key of Object.keys(context)) {
            context[key] = await Promise.resolve(context[key]);
        }
        return context;
    }

    canResolve(dependency: IDependency): boolean {
        return dependencyIsDiscoverDependency(dependency) && (dependency as any).userInputType === undefined;
    }
}
