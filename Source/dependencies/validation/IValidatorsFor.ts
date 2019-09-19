/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, ICanValidateDependency } from '../internal';

/**
 * Defines a system that can manages validators for dependencies
 *
 * @export
 * @interface ICanValidateDependency
 */
export interface IValidatorsFor<T extends IDependency> {
    
    /**
     * Adds validators
     *
     * @param {...ICanValidateDependency<T>[]} validators
     */
    add(...validators: ICanValidateDependency<T>[]): void

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
