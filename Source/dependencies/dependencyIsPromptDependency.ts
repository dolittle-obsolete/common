/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IPromptDependency, promptDependencyType } from './internal';

/**
 * Type-guard for {IPromptDependency}
 *
 * @export
 * @param {IDependency} dependency
 */
export function dependencyIsPromptDependency(dependency: IDependency): dependency is IPromptDependency {
    return dependency.type === promptDependencyType;
}
