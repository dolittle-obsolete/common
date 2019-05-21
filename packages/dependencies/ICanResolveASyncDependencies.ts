/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, ICanResolveDependencies } from './internal';

/**
 * Represents a system that can resolve async dependencies
 *
 * @export
 * @interface ICanResolveASyncDependencies
 */
export interface ICanResolveASyncDependencies extends ICanResolveDependencies {
    
    /**
     * Resolves async dependencies and returns the context object
     *
     * @param {*} context
     * @param {IDependency[]} dependencies
     * @param {string} [destinationPath]
     * @param {string} [coreLanguage]
     * @param {string[]} [args]
     * @returns {Promise<any>}
     * @memberof ICanResolveASyncDependencies
     */
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]): Promise<any>

}