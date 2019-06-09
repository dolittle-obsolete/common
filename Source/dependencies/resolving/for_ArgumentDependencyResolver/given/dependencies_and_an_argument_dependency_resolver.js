/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ArgumentDependencyResolver, PromptDependency, DiscoverDependency, DiscoverAndPromptDependency } from "../../../index";

export class dependencies_and_an_argument_dependency_resolver {
    constructor() {
        this.argumentDependencyResolver = new ArgumentDependencyResolver();
        this.promptDependency = new PromptDependency('name', 'desc', 'input', 'something');
        this.discoverDependency = new DiscoverDependency('name', 'desc', 'namespace', undefined, 'something');
        this.discoverAndPromptDependency = new DiscoverAndPromptDependency('name', 'desc', 'namespace', 'input', 'message', undefined, undefined, undefined, 'something');
        this.argumentDependency = new PromptDependency('name', 'desc', 'argument', 'message');
    }
}