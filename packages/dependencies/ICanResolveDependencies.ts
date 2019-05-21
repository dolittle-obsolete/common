/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from './internal';

/**
 * Represents a system that can resolve dependencies
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
     * @memberof ICanResolveDependencies
     */
    canResolve(dependency: IDependency): boolean;
    /**
     * Resolves dependencies and returns the context object
     *
     * @param {*} context
     * @param {IDependency[]} dependencies
     * @param {string} [destinationPath]
     * @param {string} [coreLanguage]
     * @param {string[]} [args]
     * @returns {Promise<any> | any}
     * @memberof ICanResolveDependencies
     */
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any> | any

}