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
     * Gets the dependency resolvers
     *
     * @type {ICanResolveDependencies[]}
     * @memberof IDependencyResolvers
     */
    readonly resolvers: ICanResolveDependencies[];
    /**
     * Add resolvers
     *
     * @param {...ICanResolveDependencies[]} resolver
     * @memberof IDependencyResolvers
     */
    addResolvers(...resolver: ICanResolveDependencies[]): void
    /**
     * Resolves all dependencies
     *
     * @param {*} context
     * @param {IDependency[]} dependencies
     * @param {string} [destinationPath]
     * @param {string} [coreLanguage]
     * @param {string[]} [args]
     * @returns {Promise<any>}
     * @memberof IDependencyResolvers
     */
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any>

}