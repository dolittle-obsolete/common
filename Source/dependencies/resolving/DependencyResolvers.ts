/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependencyResolvers, ICanResolveDependencies, IDependency, MultipleResolversForDependency, CannotResolveDependency  } from '../index';
import { ILoggers } from '@dolittle/tooling.common.logging';

 /**
  * Represents an implementation of {IDependencyResolvers}
  *
  * @export
  * @class DependencyResolvers
  * @implements {IDependencyResolvers}
  */
 export class DependencyResolvers implements IDependencyResolvers {
    /**
     * Instantiates an instance of {DependencyResolvers}.
     * @param {ICanResolveDependencies[]} _resolvers
     */
    constructor(private _resolvers: ICanResolveDependencies[], private _loggers: ILoggers) {}

    get resolvers() { return this._resolvers; }

    add(...resolvers: ICanResolveDependencies[]): void {
        this._resolvers.push(...resolvers);
    }
    
    async resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[], options?: Map<string, any>): Promise<any> {
        this._loggers.info('Resolving dependencies');
        let resolversMap = this.getResolverToDependenciesMap(dependencies).entries();
        for (let entry of resolversMap) {
            let resolver = entry[0];
            let deps = entry[1];
            context = await Promise.resolve(resolver.resolve(context, deps, destinationPath, coreLanguage, args, options));
        }
        this._loggers.info('Finished resolving dependencies');
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
            if (!resolver) throw new CannotResolveDependency(dep);
            if (resolvers > 1) throw new MultipleResolversForDependency(dep);
            
            let deps = resolverToDependenciesMap.get(resolver);
            if (deps) resolverToDependenciesMap.set(resolver, [...deps, dep]);
            else resolverToDependenciesMap.set(resolver, [dep]);
        });

        return resolverToDependenciesMap;
    }
 }