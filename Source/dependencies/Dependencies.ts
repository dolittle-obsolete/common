/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency, IValidatorsFor, IDependencies } from "./internal";

 /**
 * Represents an implementation of {IDependencies}
 *
 * @export
 * @class Dependencies
 * @implements {IDependencies}
 */
export class Dependencies implements IDependencies {

    /**
     * Instantiates an instance of {Dependencies}.
     * @param {IDependency[]} _dependencies
     * @param {IValidatorsFor<IDependency>} _validators
     */
    constructor(private _dependencies: IDependency[], private _validators: IValidatorsFor<IDependency> ) {
        _dependencies.forEach(_ => {
            if (_validators.canValidate(_)) _validators.validate(_);
        });
    }

    get dependencies() {
        return this._dependencies;
    }

    get validators() {
        return this._validators;
    }

    add(...dependencies: IDependency[]) {
        dependencies.forEach(_ => {
            if (this._validators.canValidate(_)) this._validators.validate(_);
        });
        this._dependencies.push(...dependencies);
    }
}
