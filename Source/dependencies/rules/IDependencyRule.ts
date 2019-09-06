/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '../index';

/**
 * Defines a rule for a dependency
 *
 * @export
 * @interface IDependencyRule
 */
export interface IDependencyRule<T extends IDependency> {
    
    /**
     * Whether this is a rule for given dependency
     *
     * @param {T} dependency
     * @returns {boolean}
     */
    isRuleFor(dependency: T): boolean;

    /**
     * Whether this rule is respected
     *
     * @param {*} value
     * @returns {boolean}
     */
    isRespected(value: any): boolean

}
