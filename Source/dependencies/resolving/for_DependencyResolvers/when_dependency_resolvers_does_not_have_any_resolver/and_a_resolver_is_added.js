/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_resolvers } from "../given/dependencies_and_a_system_that_knows_about_no_resolvers";
import { ArgumentDependencyResolver } from "../../../index";

describe('and a resolver is added', () => {
    let context = new dependencies_and_a_system_that_knows_about_no_resolvers();
    context.dependencyResolvers.add(new ArgumentDependencyResolver());
    let resolvers = context.dependencyResolvers.resolvers;

    it('Should have one parser', () => resolvers.length.should.equal(1));
});