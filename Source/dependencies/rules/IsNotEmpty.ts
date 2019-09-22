/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependencyRule } from '../internal';

/**
 * Represents an implementation of {IDependencyRule} for checking if value is not empty
 *
 * @export
 * @class IsNotEmptyRule
 * @implements {IDependencyRule}
 */
export class IsNotEmpty implements IDependencyRule {
    
    isRespected(value: any) {
        return value !== undefined && value !== '';
    }

}
