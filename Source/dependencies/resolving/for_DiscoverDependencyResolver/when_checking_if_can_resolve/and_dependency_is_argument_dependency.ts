/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_discover_dependency_resolver } from "../given/dependencies_and_a_discover_dependency_resolver";

describe('and dependency is argument dependency', () => {
    let context = new dependencies_and_a_discover_dependency_resolver();
    
    it('Should not be able to resolve', () => context.discoverDependencyResolver.canResolve(context.argumentDependency).should.be.false);
});