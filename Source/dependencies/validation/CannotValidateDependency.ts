/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';
import { IDependency, ICanValidateDependency } from '../internal';

/**
 * The exception that gets throw when a dependency validator is attempting to validate a dependency that it cannot validate
 *
 * @export
 * @class CannotValidateDependency
 * @extends {Exception}
 */
export class CannotValidateDependency extends Exception {

    /**
     * Instantiates an instance of {CannotValidateDependency}.
     * @param {IDependency} dependency
     * @param {ICanValidateDependency} validator
     */
    constructor(dependency: IDependency, validator: ICanValidateDependency<IDependency>) {
        super(`Dependency validator '${validator.constructor.name}' cannot validate dependency with name '${dependency.name}'`);
    }
}
