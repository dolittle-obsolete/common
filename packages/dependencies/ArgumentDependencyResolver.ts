/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { argumentUserInputType, promptDependencyType, ICanResolveSyncDependencies, Dependency, ArgumentsNotMatchingDependenciesError, CannotResolveDependencyError, PromptDependency } from "./internal";

/**
 * Resolves argument dependencies
 *
 * @export
 * @class ArgumentDependencyResolver
 * @implements {ICanResolveSyncDependencies}
 */
export class ArgumentDependencyResolver implements ICanResolveSyncDependencies {
    
    resolve(context: any, dependencies: Dependency[], destinationPath?: string, coreLanguage?: string, args?: string[]) {
        if (args === undefined && dependencies.length === 0) return context;
        else if (args !== undefined) {
            if (args.length !== dependencies.length) {
                throw ArgumentsNotMatchingDependenciesError.new;
            }
            dependencies.forEach((dep, i) => {
                if (!this.canResolve(dep)) throw new CannotResolveDependencyError(`Could not resolve dependency with name '${dep.name}'`);
                context[dep.name] = args[i];        
            });
            return context;
        }
        throw ArgumentsNotMatchingDependenciesError.new;
    }    
    
    canResolve(dependency: Dependency): boolean {
        return dependency.type === promptDependencyType && (<any>dependency).userInputType === argumentUserInputType;
    }

}