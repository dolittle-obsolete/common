/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_resolvers } from '../given/dependencies_and_a_system_that_knows_about_no_resolvers';
import { MultipleResolversForDependency } from '../../../internal';
import Substitute from '@fluffy-spoon/substitute';
import { ICanResolveDependencies } from '../../../internal';
import { expect } from 'chai';


describe('and resolving a dependency with multiple resolvers', () => {
    const context = new dependencies_and_a_system_that_knows_about_no_resolvers();
    let exception: Error;
    const resolver1 = Substitute.for<ICanResolveDependencies>();
    const resolver2 = Substitute.for<ICanResolveDependencies>();
    resolver1.canResolve(context.argumentDependency).returns(true);
    resolver2.canResolve(context.argumentDependency).returns(true);
    context.dependencyResolvers.add(resolver1);
    context.dependencyResolvers.add(resolver2);

    before(async () => {
        try {
            await context.dependencyResolvers.resolve({}, [context.argumentDependency], [], undefined, undefined);

        } catch (error) {
            exception = error;
        }
    });

    it('Should be able to resolve it', () => expect(exception).to.not.be.null);
    it('Should throw a MultipleResolversForDependency exception', () => exception.should.be.instanceof(MultipleResolversForDependency));
});
