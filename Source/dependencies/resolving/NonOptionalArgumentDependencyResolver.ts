/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { argumentUserInputType, IDependency, ArgumentsNotMatchingDependencies, CannotResolveDependency, dependencyIsPromptDependency, ICanResolveDependencies } from "../index";

/**
 * Represents an implementation of {ICanResolveDependencies} for resolving non-optional argument dependencies
 *
 * @export
 * @class NonOptionalArgumentDependencyResolver
 * @implements {ICanResolveDependencies}
 */
export class NonOptionalArgumentDependencyResolver implements ICanResolveDependencies {
    
    async resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]) {
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