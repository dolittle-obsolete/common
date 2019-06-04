/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {dolittleConfig} from '@dolittle/tooling.common.configurations';
import { DiscoverDependencyResolver, PromptDependency, DiscoverDependency, DiscoverAndPromptDependency } from "../../../index";

export class dependencies_and_a_discover_dependency_resolver {
    constructor() {
        this.discoverDependencyResolver = new DiscoverDependencyResolver(
            {
                resolve: sinon.stub().returns('something')
            }, dolittleConfig
        );
        this.promptDependency = new PromptDependency('name', 'desc', 'input', 'something');
        this.discoverDependency = new DiscoverDependency('name', 'desc', 'namespace', undefined, 'something');
        this.discoverAndPromptDependency = new DiscoverAndPromptDependency('name', 'desc', 'namespace', 'input', 'message', undefined, undefined, undefined, 'something');
        this.argumentDependency = new PromptDependency('name', 'desc', 'argument', 'message');
    }
}