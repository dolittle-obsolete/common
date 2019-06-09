/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, IDiscoverDependency, discoverDependencyType } from "./index";

/**
 * Type-guard for {IDiscoverDependency}
 *
 * @export
 * @param {IDependency} dependency
 */
export function dependencyIsDiscoverDependency(dependency: IDependency): dependency is IDiscoverDependency {
    return dependency.type === discoverDependencyType;
}