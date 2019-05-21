/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDiscoverDependency } from './internal';

export type DependencyDiscoverResult = string | string[] | {value: string, namespace: string}[]

/**
 * Responsible for resolving the 'discover' part of a dependency
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
     * @returns 
     */
    resolve(dependency: IDiscoverDependency, startLocation: string, language: string, dolittleConfig: any ): DependencyDiscoverResult

}