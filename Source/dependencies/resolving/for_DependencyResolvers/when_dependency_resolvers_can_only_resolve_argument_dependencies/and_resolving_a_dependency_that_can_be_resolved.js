/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_resolvers } from "../given/dependencies_and_a_system_that_knows_about_no_resolvers";
import { NonOptionalArgumentDependencyResolver } from "../../../index";


describe('and resolving a dependency that can be resolved', () => {
    let context = new dependencies_and_a_system_that_knows_about_no_resolvers();
    context.dependencyResolvers.add(new NonOptionalArgumentDependencyResolver());
    let result;
    before(async () => {
        result = await context.dependencyResolvers.resolve({}, [context.argumentDependency], undefined, undefined, ['something']);

    })

    it('Should be able to resolve it', () => result.should.not.be.undefined);
});