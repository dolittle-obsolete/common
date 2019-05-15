/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency, ICanResolveDependencies } from './internal';

/**
 * Represents a system that can resolve sync dependencies
 *
 * @export
 * @interface ICanResolveSyncDependencies
 */
export interface ICanResolveSyncDependencies extends ICanResolveDependencies {
    /**
     * Resolves sync dependencies and returns the context object
     *
     * @param {*} context
     * @param {Dependency[]} dependencies
     * @param {string} [destinationPath]
     * @param {string} [coreLanguage]
     * @param {string[]} [args]
     * @returns {any}
     * @memberof ICanResolveSyncDependencies
     */
    resolve(context: any, dependencies: Dependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): any

}