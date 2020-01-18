/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, ICanValidateDependency, IValidatorsFor } from '../internal';

/**
 * Represents an abstract implementation of {IValidatorsFor<T>}
 *
 * @export
 * @interface ICanValidateDependency
 */
export abstract class ValidatorsFor<T extends IDependency> implements IValidatorsFor<T> {

    /**
     * Instantiates an instance of {ValidatorsFor}.
     * @param {ICanValidateDependency<T>[]} _validators
     */
    constructor(private _validators: ICanValidateDependency<T>[]) {}

    add(...validators: ICanValidateDependency<T>[]) {
        this._validators.push(...validators);
    }

    canValidate(dependency: T) {
        for (const validator of this._validators) {
            if (validator.canValidate(dependency)) return true;
        }
        return false;
    }

    validate(dependency: T) {
        this._validators.forEach(_ => {
            if (_.canValidate(dependency)) _.validate(dependency);
        });
    }

}
