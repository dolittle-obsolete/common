/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { folders, logger, fileSystem, dolittleConfig } from '@dolittle/tooling.common.utilities';
import { IDependencyDiscoverResolver, DependencyDiscoverResolver, IDependencyResolvers, ICanResolveSyncDependencies, ArgumentDependencyResolver, DiscoverDependencyResolver, ICanResolveDependencies, DependencyResolvers, ICanParseDependencies, DiscoverDependencyParser, PromptDependencyParser, DiscoverAndPromptDependencyParser, IDependencyParsers, DependencyParsers } from './internal';

export * from './internal';

export let dependencyDiscoverResolver: IDependencyDiscoverResolver = new DependencyDiscoverResolver(folders, fileSystem, dolittleConfig, logger);
export function setDependencyDiscoverResolver(resolver: IDependencyDiscoverResolver) { dependencyDiscoverResolver = resolver; }

export let argumentDependencyResolver: ICanResolveDependencies = new ArgumentDependencyResolver();
export function setArgumentDependencyResolver(resolver: ICanResolveSyncDependencies) { argumentDependencyResolver = resolver; }

export let nonPromptDependencyResolver: ICanResolveDependencies = new DiscoverDependencyResolver(dependencyDiscoverResolver, dolittleConfig);
export function setNonPromptDependencyResolver(resolver: ICanResolveSyncDependencies) { nonPromptDependencyResolver = resolver; }

let resolvers: ICanResolveDependencies[] = [argumentDependencyResolver, nonPromptDependencyResolver];
export let dependencyResolvers: IDependencyResolvers = new DependencyResolvers(resolvers);

export let discoverDependencyParser: ICanParseDependencies = new DiscoverDependencyParser();
export let promptDependencyParser: ICanParseDependencies = new PromptDependencyParser();
export let discoverAndPromptDependencyParser: ICanParseDependencies = new DiscoverAndPromptDependencyParser();

let parsers: ICanParseDependencies[] = [discoverDependencyParser, promptDependencyParser, discoverAndPromptDependencyParser];
export let dependencyParsers: IDependencyParsers = new DependencyParsers(parsers);