/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Defines a rule for a dependency
 *
 * @export
 * @interface IDependencyRule
 */
export interface IDependencyRule {

    /**
     * Whether this rule is respected
     *
     * @param {*} value
     * @returns {boolean}
     */
    isRespected(value: any): boolean

}
