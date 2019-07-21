/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDiscoverDependency, DependencyDiscoverResult } from '../index';

/**
 * Defines a system for resolving the 'discover' part of a dependency
 *
 * @export
 * @class IDependencyDiscoverResolver
 */
export interface IDependencyDiscoverResolver {
    
    /**
     * Resolves the 'discover' part of a dependency
     * @param {Dependency} dependency The dependency 
     * @param {string} startLocation The path to start searching from
     * @param {string} language The core language
     * @param {any} dolittleConfig
     * @returns {Promise<DependencyDiscoverResolver>}
     */
    resolve(dependency: IDiscoverDependency, startLocation: string, language: string, dolittleConfig: any ): Promise<DependencyDiscoverResult>

}