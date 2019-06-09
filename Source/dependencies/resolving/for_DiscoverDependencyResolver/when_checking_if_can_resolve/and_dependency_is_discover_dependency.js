/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_discover_dependency_resolver } from "../given/dependencies_and_a_discover_dependency_resolver";

describe('and dependency is discover dependency', () => {
    let context = new dependencies_and_a_discover_dependency_resolver();
    
    it('Should be able to resolve', context.discoverDependencyResolver.canResolve(context.discoverDependency).should.be.true);
});