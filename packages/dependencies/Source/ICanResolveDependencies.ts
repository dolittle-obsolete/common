/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from './Dependency';

/**
 * Represents a class that can resolve dependencies
 *
 * @export
 * @interface ICanResolveDependencies
 */
export interface ICanResolveDependencies {
    /**
     * Whether this system can resolve the given dependency
     *
     * @param {Dependency} dependency
     * @returns {boolean}
     * @memberof ICanResolveDependencies
     */
    canResolve(dependency: Dependency): boolean;
    /**
     * Resolves dependencies and returns the context object
     *
     * @param {*} context
     * @param {Dependency[]} dependencies
     * @param {string} [destinationPath]
     * @param {string} [coreLanguage]
     * @param {string[]} [args]
     * @returns {Promise<any> | any}
     * @memberof ICanResolveDependencies
     */
    resolve(context: any, dependencies: Dependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any> | any

}