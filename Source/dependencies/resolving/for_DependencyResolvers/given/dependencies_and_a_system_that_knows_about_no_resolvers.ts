/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DependencyResolvers, PromptDependency, DiscoverDependency, DiscoverAndPromptDependency } from "../../../internal";
import Substitute from "@fluffy-spoon/substitute";
import { ILoggers } from "@dolittle/tooling.common.logging";

export class dependencies_and_a_system_that_knows_about_no_resolvers {
    dependencyResolvers: DependencyResolvers;
    promptDependency: PromptDependency;
    discoverDependency: DiscoverDependency;
    discoverAndPromptDependency: DiscoverAndPromptDependency;
    argumentDependency: PromptDependency;
    constructor() {
        this.dependencyResolvers = new DependencyResolvers([], Substitute.for<ILoggers>());

        this.promptDependency = new PromptDependency('name', 'desc', [], 'input', 'something');
        this.discoverDependency = new DiscoverDependency('name', 'desc', [], 'namespace', undefined, 'something');
        this.discoverAndPromptDependency = new DiscoverAndPromptDependency('name', 'desc', [], 'namespace', 'input', 'message', undefined, undefined, undefined, 'something');
        this.argumentDependency = new PromptDependency('name', 'desc', [], 'argument', 'message');
    }
}
    