/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IDependencyRuleFor } from '../internal';

/**
 * Defines a system that can resolve dependencies
 *
 * @export
 * @interface ICanResolveDependencies
 */
export interface ICanResolveDependencies {
    
    /**
     * Whether this system can resolve the given dependency
     *
     * @param {IDependency} dependency
     * @returns {boolean}
     */
    canResolve(dependency: IDependency): boolean;

    /**
     * Resolves dependencies and returns the context object
     *
     * @param {*} context The context to base off of. Fields will be appended to the context and returned
     * @param {IDependency[]} dependencies The dependencies to resolve
     * @param {IDependencyRuleFor<IDependency>[]} additionalRules
     * @param {string} [destinationPath] The optional source path for where the discovery mechanism should start from 
     * @param {string} [coreLanguage] The optional core language
     * @returns {Promise<any>}
     */
    resolve(context: any, dependencies: IDependency[], additionalRules: IDependencyRuleFor<IDependency>[], destinationPath?: string, coreLanguage?: string): Promise<any>

}