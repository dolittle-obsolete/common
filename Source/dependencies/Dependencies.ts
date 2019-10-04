/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency, IValidatorsFor, IDependencies, DuplicateDependencies } from "./internal";

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
        this.throwIfDuplicateDependencies()
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

    private throwIfDuplicateDependencies() {
        let names = this._dependencies.map(_ => _.name);
        names.forEach((name, i) => {
            if (names.slice(i + 1).includes(name)) throw new DuplicateDependencies(name);
        });
    }
}
