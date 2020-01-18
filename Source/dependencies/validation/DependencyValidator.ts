/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, ICanValidateDependency } from '../internal';

/**
 * Represents an abstract implementation of {ICanValidateDependency} for validating all dependencies
 *
 * @export
 * @abstract
 * @class DependencyValidator
 * @implements {ICanValidateDependency<IDependency>}
 */
export abstract class DependencyValidator implements ICanValidateDependency<IDependency> {

    canValidate(dependency: IDependency) {
        return true;
    }

    abstract validate(dependency: IDependency): void;

}
