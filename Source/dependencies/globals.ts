/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { folders, fileSystem } from '@dolittle/tooling.common.files';
import { dolittleConfig } from '@dolittle/tooling.common.configurations';
import { loggers } from '@dolittle/tooling.common.logging';
import { 
    IDependencyDiscoverResolver, DependencyDiscoverResolver, IDependencyResolvers, DiscoverDependencyResolver, 
    ICanResolveDependencies, DependencyResolvers, ICanParseDependencies, DiscoverDependencyParser, PromptDependencyParser, DiscoverAndPromptDependencyParser, IDependencyParsers, DependencyParsers
} from './internal';

export let dependencyDiscoverResolver: IDependencyDiscoverResolver = new DependencyDiscoverResolver(folders, fileSystem, dolittleConfig, loggers);

export let nonPromptDependencyResolver: ICanResolveDependencies = new DiscoverDependencyResolver(dependencyDiscoverResolver, dolittleConfig);

let resolvers: ICanResolveDependencies[] = [nonPromptDependencyResolver];
export let dependencyResolvers: IDependencyResolvers = new DependencyResolvers(resolvers, loggers);

export let discoverDependencyParser: ICanParseDependencies = new DiscoverDependencyParser();
export let promptDependencyParser: ICanParseDependencies = new PromptDependencyParser();
export let discoverAndPromptDependencyParser: ICanParseDependencies = new DiscoverAndPromptDependencyParser();

let parsers: ICanParseDependencies[] = [discoverDependencyParser, promptDependencyParser, discoverAndPromptDependencyParser];
export let dependencyParsers: IDependencyParsers = new DependencyParsers(parsers, loggers);
