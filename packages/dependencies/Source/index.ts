/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { folders, logger, fileSystem, dolittleConfig } from '@dolittle/tooling.common.utilities';
import { IDependenciesManager, DependenciesManager, IDependencyResolvers, ICanResolveSyncDependencies, ArgumentDependencyResolver, NonPromptDependencyResolver, ICanResolveDependencies, DependencyResolvers } from './internal';

export * from './internal';

export const dependenciesManager: IDependenciesManager = new DependenciesManager(folders, fileSystem, dolittleConfig, logger);

export let argumentDependencyResolver: ICanResolveDependencies = new ArgumentDependencyResolver();
export function setArgumentDependencyResolver(resolver: ICanResolveSyncDependencies) { argumentDependencyResolver = resolver; }

export let nonPromptDependencyResolver: ICanResolveDependencies = new NonPromptDependencyResolver(dependenciesManager, dolittleConfig);
export function setNonPromptDependencyResolver(resolver: ICanResolveSyncDependencies) { nonPromptDependencyResolver = resolver; }

let resolvers: ICanResolveDependencies[] = [argumentDependencyResolver, nonPromptDependencyResolver];

export let dependencyResolvers: IDependencyResolvers = new DependencyResolvers(resolvers);