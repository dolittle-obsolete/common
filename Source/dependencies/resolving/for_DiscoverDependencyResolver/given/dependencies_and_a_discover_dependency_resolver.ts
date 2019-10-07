/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {dolittleConfig} from '@dolittle/tooling.common.configurations';
import { DiscoverDependencyResolver, PromptDependency, DiscoverDependency, DiscoverAndPromptDependency } from "../../../internal";
import Substitute from '@fluffy-spoon/substitute';
import { IDependencyDiscoverResolver } from '../../../internal';
import { AllArguments } from '@fluffy-spoon/substitute/dist/src/Arguments';

export class dependencies_and_a_discover_dependency_resolver {
    discoverDependencyResolver: DiscoverDependencyResolver;
    promptDependency: PromptDependency;
    discoverDependency: DiscoverDependency;
    discoverAndPromptDependency: DiscoverAndPromptDependency;
    argumentDependency: PromptDependency;
    constructor() {
        let dependencyDiscoverResolver = Substitute.for<IDependencyDiscoverResolver>();
        dependencyDiscoverResolver.resolve(new AllArguments()).returns(Promise.resolve('something'));
        this.discoverDependencyResolver = new DiscoverDependencyResolver(
            dependencyDiscoverResolver,
            dolittleConfig
        );
        this.promptDependency = new PromptDependency('name', 'desc', [], 'input', 'something');
        this.discoverDependency = new DiscoverDependency('name', 'desc', [], 'namespace', undefined, 'something');
        this.discoverAndPromptDependency = new DiscoverAndPromptDependency('name', 'desc', [], 'namespace', 'input', 'message', undefined, undefined, undefined, 'something');
        this.argumentDependency = new PromptDependency('name', 'desc', [], 'argument', 'message');
    }
}