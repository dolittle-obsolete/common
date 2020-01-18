/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_resolvers } from '../given/dependencies_and_a_system_that_knows_about_no_resolvers';
import Substitute from '@fluffy-spoon/substitute';
import { ICanResolveDependencies } from '../../../internal';


describe('and resolving a dependency that can be resolved', () => {
    const context = new dependencies_and_a_system_that_knows_about_no_resolvers();
    const resolver = Substitute.for<ICanResolveDependencies>();
    resolver.canResolve(context.argumentDependency).returns(true);
    context.dependencyResolvers.add(resolver);

    let result: any;
    before(async () => {
        result = await context.dependencyResolvers.resolve({}, [context.argumentDependency], [], undefined, undefined);
    });

    it('Should be able to resolve it', () => result.should.not.be.undefined);
});
