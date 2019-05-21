/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDependencyResolvers, ICanResolveDependencies, IDependency, MultipleResolversError, CannotResolveDependencyError  } from "./internal";

 /**
  * Can resolve all dependencies
  *
  * @export
  * @class DependencyResolvers
  * @implements {IDependencyResolvers}
  */
 export class DependencyResolvers implements IDependencyResolvers {
     
    constructor(private _resolvers: ICanResolveDependencies[]) {}

    get resolvers() { return this._resolvers; }

    addResolvers(...resolvers: ICanResolveDependencies[]): void {
        this._resolvers.push(...resolvers);
    }
    async resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any> {
        for (let entry of this.getResolverToDependenciesMap(dependencies).entries()) {
            let resolver = entry[0];
            let deps = entry[1];
            context = await Promise.resolve(resolver.resolve(context, deps, destinationPath, coreLanguage, args));
        }

        return context;
    }
    private getResolverToDependenciesMap(dependencies: IDependency[]) {
        let resolverToDependenciesMap = new Map<ICanResolveDependencies, IDependency[]>();
        dependencies.forEach(dep => {
            let resolvers = 0;
            let resolver: ICanResolveDependencies | undefined 
            this._resolvers.forEach(_ => {
                if (_.canResolve(dep)) {
                    resolvers++;
                    resolver = _;
                }
            });
            if (!resolver) throw new CannotResolveDependencyError(`Cannot resolve dependency with name '${dep.name}'`);
            if (resolvers > 1) throw new MultipleResolversError(`Found multiple resolvers for dependency '${dep.name}'`);
            
            let deps = resolverToDependenciesMap.get(resolver);
            if (deps) resolverToDependenciesMap.set(resolver, [...deps, dep]);
            else resolverToDependenciesMap.set(resolver, [dep]);
        });

        return resolverToDependenciesMap;
    }
 }