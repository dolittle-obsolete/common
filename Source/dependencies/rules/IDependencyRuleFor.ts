/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IDependencyRule } from '../index';

/**
 * Defines a rule for a specific set of dependencies
 *
 * @export
 * @interface IDependencyRule
 */
export interface IDependencyRuleFor<T extends IDependency> extends IDependencyRule {

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
