/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependencyRule } from '../index';

/**
 * Represents an implementation of {IDependencyRule<IDependency>} for checking if value is a number
 *
 * @export
 * @class IsStringRule
 * @implements {IDependencyRule}
 */
export class IsNumberRule implements IDependencyRule {
    
    isRespected(value: any) {
        return typeof value === 'number' || (!isNaN(value) && value !== '');
    }

}
