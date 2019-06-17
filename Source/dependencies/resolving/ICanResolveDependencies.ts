/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '../index';

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
     * @param {string} [destinationPath] The optional source path for where the discovery mechanism should start from 
     * @param {string} [coreLanguage] The optional core language 
     * @param {string[]} [args] The optional list of arguments, only used for resolving non-optional argument dependencies
     * @param {Map<string, any>} [options] The optional options, only used for resolving optional argument dependencies
     * @returns {Promise<any> | any}
     */
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[], options?: Map<string, any>): Promise<any> | any

}