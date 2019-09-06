/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICanValidateDependency, dependencyIsPromptDependency, IPromptDependency } from '../../index';

/**
 * Represents an abstract implementation of {ICanValidateDependency} for validating {IPromptDependency} prompt dependencies
 * 
 * @export
 * @abstract
 * @class PromptDependencyValidator
 * @implements {ICanValidateDependency<IPromptDependency>}
 */
export abstract class PromptDependencyValidator implements ICanValidateDependency<IPromptDependency> {
    
    canValidate(dependency: IPromptDependency) {
        return dependencyIsPromptDependency(dependency) ;
    }

    abstract validate(dependency: IPromptDependency): void

}
