/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyRule } from "internal";

/**
 * Defines a system that can parse rules from a dependency object
 *
 * @export
 * @interface IRulesParser
 */
export interface IRulesParser {

    /**
     * Parses a dependency's rules
     *
     * @param {*} value
     * @returns {IDependencyRule[]}
     */
    parse(dependencyObject: any): IDependencyRule[]

}
