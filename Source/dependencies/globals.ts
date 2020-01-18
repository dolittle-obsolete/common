/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { folders, fileSystem } from '@dolittle/tooling.common.files';
import { dolittleConfig } from '@dolittle/tooling.common.configurations';
import { loggers } from '@dolittle/tooling.common.logging';
import {
    IDependencyDiscoverResolver, DependencyDiscoverResolver, IDependencyResolvers, DiscoverDependencyResolver,
    ICanResolveDependencies, DependencyResolvers, ICanParseDependencies, DiscoverDependencyParser, PromptDependencyParser,
    DiscoverAndPromptDependencyParser, IDependencyParsers, DependencyParsers, RulesParser, IRulesParser, IsNotEmpty, IsNumber
} from './internal';

export let dependencyDiscoverResolver: IDependencyDiscoverResolver = new DependencyDiscoverResolver(folders, fileSystem, dolittleConfig, loggers);

const nonPromptDependencyResolver: ICanResolveDependencies = new DiscoverDependencyResolver(dependencyDiscoverResolver, dolittleConfig);

const resolvers: ICanResolveDependencies[] = [nonPromptDependencyResolver];
export let dependencyResolvers: IDependencyResolvers = new DependencyResolvers(resolvers, loggers);

const rulesParser: IRulesParser = new RulesParser([
    new IsNotEmpty(),
    new IsNumber()
]);

const discoverDependencyParser: ICanParseDependencies = new DiscoverDependencyParser(rulesParser);
const promptDependencyParser: ICanParseDependencies = new PromptDependencyParser(rulesParser);
const discoverAndPromptDependencyParser: ICanParseDependencies = new DiscoverAndPromptDependencyParser(rulesParser);

const parsers: ICanParseDependencies[] = [discoverDependencyParser, promptDependencyParser, discoverAndPromptDependencyParser];
export let dependencyParsers: IDependencyParsers = new DependencyParsers(parsers, loggers);
