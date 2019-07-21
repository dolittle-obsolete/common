/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { argumentUserInputType, ICanResolveDependencies, IDependency, ArgumentsNotMatchingDependencies, CannotResolveDependency, dependencyIsPromptDependency } from "../index";

/**
 * Represents an implementation of {ICanResolveDependencies} for resolving optional argument dependencies (in CLI this would be options)
 *
 * @export
 * @class OptionalArgumentDependencyResolver
 * @implements {ICanResolveDependencies}
 */
export class OptionalArgumentDependencyResolver implements ICanResolveDependencies {
    
    async resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[], options?: Map<string, any>) {
        if (options === undefined && dependencies.length === 0) return context;
        else if (options !== undefined) {
            dependencies.forEach((dep, i) => {
                if (!this.canResolve(dep)) throw new CannotResolveDependency(dep);
                context[dep.name] = options.get(dep.name);        
            });
            return context;
        }
        throw new ArgumentsNotMatchingDependencies();
    }    
    
    canResolve(dependency: IDependency): boolean {
        return dependencyIsPromptDependency(dependency) && dependency.userInputType === argumentUserInputType && dependency.optional;
    }

}