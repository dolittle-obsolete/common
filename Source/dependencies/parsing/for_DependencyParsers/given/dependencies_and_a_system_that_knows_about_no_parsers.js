/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DependencyParsers, PromptDependency, DiscoverDependency, DiscoverAndPromptDependency } from "../../../internal";

export class dependencies_and_a_system_that_knows_about_no_parsers {
    constructor() {
        this.dependencyParsers = new DependencyParsers([]);

        this.promptDependency = new PromptDependency('name', 'desc', 'input', 'something');
        this.discoverDependency = new DiscoverDependency('name', 'desc', 'namespace', undefined, 'something');
        this.discoverAndPromptDependency = new DiscoverAndPromptDependency('name', 'desc', 'namespace', 'input', 'message', undefined, undefined, undefined, 'something');

    }
}
    