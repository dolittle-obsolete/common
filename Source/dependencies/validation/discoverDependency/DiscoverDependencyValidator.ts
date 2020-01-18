/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanValidateDependency, IDiscoverDependency, dependencyIsDiscoverDependency } from '../../internal';

/**
 * Represents an abstract implementation of {ICanValidateDependency} for validating {IDiscoverDependency} discover dependencies
 *
 * @export
 * @abstract
 * @class DiscoverDependencyValidator
 * @implements {ICanValidateDependency<IDiscoverDependency>}
 */
export abstract class DiscoverDependencyValidator implements ICanValidateDependency<IDiscoverDependency> {

    canValidate(dependency: IDiscoverDependency) {
        return dependencyIsDiscoverDependency(dependency) ;
    }

    abstract validate(dependency: IDiscoverDependency): void;

}
