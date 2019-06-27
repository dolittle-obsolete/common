/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { argumentUserInputType, ICanResolveSyncDependencies, IDependency, ArgumentsNotMatchingDependencies, CannotResolveDependency, dependencyIsPromptDependency } from "../index";

/**
 * Represents an implementation of {ICanResolveSyncDependencies} for resolving non-optional argument dependencies
 *
 * @export
 * @class NonOptionalArgumentDependencyResolver
 * @implements {ICanResolveSyncDependencies}
 */
export class NonOptionalArgumentDependencyResolver implements ICanResolveSyncDependencies {
    
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]) {
        if (args === undefined && dependencies.length === 0) return context;
        else if (args !== undefined) {
            if (args.length !== dependencies.length) {
                throw new ArgumentsNotMatchingDependencies();
            }
            dependencies.forEach((dep, i) => {
                if (!this.canResolve(dep)) throw new CannotResolveDependency(dep);
                context[dep.name] = args[i];        
            });
            return context;
        }
        throw new ArgumentsNotMatchingDependencies();
    }    
    
    canResolve(dependency: IDependency): boolean {
        return dependencyIsPromptDependency(dependency) && dependency.userInputType === argumentUserInputType && !dependency.optional;
    }

}