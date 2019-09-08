/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependency, Dependencies, StandardValidatorsForDependency } from "./index";

/**
 * Represents an implementation of {Dependencies} that uses the standard dependency validators 
 *
 * @export
 * @class DependenciesWithStandardValidators
 * @extends {Dependencies}
 */
export class DependenciesWithStandardValidators extends Dependencies {

    /**
     * Instantiates an instance of {DependenciesWithStandardValidators}.
     * @param {IDependency[]} _dependencies
     */
    constructor(dependencies: IDependency[]) {
        super(dependencies, new StandardValidatorsForDependency());
    }

}
