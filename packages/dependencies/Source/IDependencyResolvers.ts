/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from './Dependency';
import { ICanResolveDependencies } from './ICanResolveDependencies';

/**
 * Represents a class that can resolve sync dependencies
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
     * Resolves all dependencies
     *
     * @param {*} context
     * @param {Dependency[]} dependencies
     * @param {string} [destinationPath]
     * @param {string} [coreLanguage]
     * @param {string[]} [args]
     * @returns {Promise<any>}
     * @memberof IDependencyResolvers
     */
    resolve(context: any, dependencies: Dependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any>

}