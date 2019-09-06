/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '../index';

/**
 * Defines a system that can validate a dependency in terms of whether a dependency is correctly structured
 *
 * @export
 * @interface ICanValidateDependency
 */
export interface ICanValidateDependency<T extends IDependency> {
    
    /**
     * Whether this system can validate dependency
     *
     * @param {T} dependency
     * @returns {boolean}
     */
    canValidate(dependency: T): boolean;

    /**
     * Validates a dependency
     *
     * @param {T} dependency
     * @returns {any>}
     */
    validate(dependency: T): void

}
