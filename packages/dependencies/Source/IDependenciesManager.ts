/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from './Dependency';

/**
 * Manages the dependencies
 *
 * @export
 * @class DependenciesManager
 */
export interface IDependenciesManager {
    /**
     * Discovers a dependency
     * @param {Dependency} dependency The dependency 
     * @param {string} startLocation The path to start searching from
     * @param {string} language The core language
     * @param {any} dolittleConfig
     * @returns {string[] | {value: string, namespace: string}[]} A list of paths or a list of paths and namespace names
     */
    discover(dependency: Dependency, startLocation: string, language: string, dolittleConfig: any ): string | string[] | {value: string, namespace: string}[];

}