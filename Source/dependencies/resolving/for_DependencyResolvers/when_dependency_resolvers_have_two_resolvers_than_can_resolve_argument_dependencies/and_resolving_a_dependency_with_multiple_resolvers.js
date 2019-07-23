/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_resolvers } from "../given/dependencies_and_a_system_that_knows_about_no_resolvers";
import { NonOptionalArgumentDependencyResolver, MultipleResolversForDependency } from "../../../index";


describe('and resolving a dependency with multiple resolvers', () => {
    let context = new dependencies_and_a_system_that_knows_about_no_resolvers();
    let exception = null;
    context.dependencyResolvers.add(new NonOptionalArgumentDependencyResolver());
    context.dependencyResolvers.add(new NonOptionalArgumentDependencyResolver());
    
    before(async () => {
        try {
            await context.dependencyResolvers.resolve({}, [context.argumentDependency], undefined, undefined, ['something']);
    
        } catch (error) {
            exception = error;
        }
    });

    it('Should be able to resolve it', () => expect(exception).to.not.be.null);
    it('Should throw a MultipleResolversForDependency exception', () => exception.should.be.instanceof(MultipleResolversForDependency))
});