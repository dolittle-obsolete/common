/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';
import { IDependency } from '../internal';

/**
 * The exception that gets throw when a dependency has a field that is invalid
 *
 * @export
 * @class InvalidField
 * @extends {Exception}
 */
export class InvalidField extends Exception {

    /**
     * Instantiates an instance of {InvalidField}.
     * @param {IDependency} dependency
     * @param {string} field
     * @param {string} [message]
     */
    constructor(dependency: IDependency, field: string, message?: string) {
        super(`Dependency with name '${dependency.name}' has invalid field '${field}'.${message ? ` ${message}` : ''}`);
    }
}
