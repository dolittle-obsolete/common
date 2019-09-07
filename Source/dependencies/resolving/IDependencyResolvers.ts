/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, ICanResolveDependencies, IDependencyRuleFor } from '../index';

/**
 * Defines a system that can resolve dependencies
 *
 * @export
 * @interface ICanResolveSyncDependencies
 */
export interface IDependencyResolvers {

    /**
     * All instances of {ICanResolveDependencies} that this system uses for resolving dependencies
     *
     * @type {ICanResolveDependencies[]}
     */
    readonly resolvers: ICanResolveDependencies[];

    /**
     * Add instances of {ICanResolveDependencies} resolvers to the dependency resolving system
     *
     * @param {...ICanResolveDependencies[]} resolvers
     */
    add(...resolvers: ICanResolveDependencies[]): void

    /**
     * Resolves the dependencies
     *
     * Throws an exception if there are multiple resolvers for a dependency
     * 
     * @param {*} context The context to base off of. Fields will be appended to the context and returned
     * @param {IDependency[]} dependencies The dependencies to resolve
     * @param {IDependencyRuleFor<IDependency>[]} additionalRules
     * @param {string} [destinationPath] The optional source path for where the discovery mechanism should start from 
     * @param {string} [coreLanguage] The optional core language
     * @param {string[]} [args] The optional list of arguments, only used for resolving argument dependencies
     * @param {Map<string, any>} [options] The optional map of options, only used for resolving argument dependencies
     * @returns {Promise<any>}
     */
    resolve(context: any, dependencies: IDependency[], additionalRules: IDependencyRuleFor<IDependency>[], destinationPath?: string, coreLanguage?: string, args?: string[], options?: Map<string, any>): Promise<any>
}
