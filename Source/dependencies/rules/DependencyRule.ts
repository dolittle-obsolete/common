/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IDependencyRuleFor } from '../internal';

/**
 * Represents an abstract implementation of {IDependencyRuleFor<IDependency>} that defines a rule that applies to a given set of dependencies
 *
 * @export
 * @class IsStringRule
 * @implements {IDependencyRule<IDependency>}
 */
export abstract class DependencyRule implements IDependencyRuleFor<IDependency> {

    /**
     * Instantiates an instance of {DependencyRule}.
     * @param {IDependency[]} _dependencies
     */
    constructor(private _dependencies: IDependency[]) {}

    isRuleFor(dependency: IDependency) {
        return this._dependencies.map(_ => _.name).includes(dependency.name);
    }

    abstract isRespected(value: any): boolean;

}
