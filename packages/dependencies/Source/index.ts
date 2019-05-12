/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IDependenciesManager } from './IDependenciesManager';
import { DependenciesManager } from './DependenciesManager';
import { folders, logger, fileSystem, dolittleConfig } from '@dolittle/tooling.common.utilities';
import { IDependencyResolvers } from './IDependencyResolvers';
import { DependencyResolvers } from './DependencyResolvers';
import { ICanResolveSyncDependencies } from './ICanResolveSyncDependencies';
import { ArgumentDependencyResolver } from './ArgumentDependencyResolver';
import { NonPromptDependencyResolver } from './NonPromptDependencyResolver';
import { ICanResolveDependencies } from './ICanResolveDependencies';

export * from './ArgumentDependencyResolver';
export * from './ArgumentsNotMatchingDependenciesError';
export * from './CannotResolveDependencyError';
export * from './DependenciesManager';
export * from './Dependency';
export * from './DependencyMissingFieldError';
export * from './DependencyResolvers';
export * from './ICanResolveASyncDependencies';
export * from './ICanResolveDependencies';
export * from './ICanResolveSyncDependencies';
export * from './IDependenciesManager';
export * from './IDependencyResolvers';
export * from './MissingCoreLanguage';
export * from './MissingDestinationPath';
export * from './MultipleResolversError';
export * from './NonPromptDependencyResolver';

export const dependenciesManager: IDependenciesManager = new DependenciesManager(folders, fileSystem, dolittleConfig, logger);

export let argumentDependencyResolver: ICanResolveDependencies = new ArgumentDependencyResolver();
export function setArgumentDependencyResolver(resolver: ICanResolveSyncDependencies) { argumentDependencyResolver = resolver; }

export let nonPromptDependencyResolver: ICanResolveDependencies = new NonPromptDependencyResolver(dependenciesManager, dolittleConfig);
export function setNonPromptDependencyResolver(resolver: ICanResolveSyncDependencies) { nonPromptDependencyResolver = resolver; }

export let resolvers: ICanResolveDependencies[] = [argumentDependencyResolver, nonPromptDependencyResolver];

export let dependencyResolvers: IDependencyResolvers = new DependencyResolvers(resolvers);