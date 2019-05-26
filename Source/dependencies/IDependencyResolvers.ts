/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, ICanResolveDependencies } from './internal';

/**
 * Represents a system that can resolve sync dependencies
 *
 * @export
 * @interface ICanResolveSyncDependencies
 */
export interface IDependencyResolvers {
    /**
     * All instances of {ICanResolveDependencies} that this system uses for resolving dependencies
     *
     * @type {ICanResolveDependencies[]}
     * @memberof IDependencyResolvers
     */
    readonly resolvers: ICanResolveDependencies[];
    /**
     * Add instances of {ICanResolveDependencies} resolvers to the dependency resolving system
     *
     * @param {...ICanResolveDependencies[]} resolvers
     * @memberof IDependencyResolvers
     */
    addResolvers(...resolvers: ICanResolveDependencies[]): void
    /**
     * Resolves all dependencies
     *
     * Throws an exception if there are multiple resolvers for a dependency
     * 
     * @param {*} context The context to base off of. Fields will be appended to the context and returned
     * @param {IDependency[]} dependencies The dependencies to resolve
     * @param {string} [destinationPath] The optional source path for where the discovery mechanism should start from 
     * @param {string} [coreLanguage] The optional core language of the created application, bounded context or artifact 
     * @param {string[]} [args] The optional list of arguments, only used for resolving argument dependencies
     * @returns {Promise<any>}
     * @memberof IDependencyResolvers
     */
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any>

}