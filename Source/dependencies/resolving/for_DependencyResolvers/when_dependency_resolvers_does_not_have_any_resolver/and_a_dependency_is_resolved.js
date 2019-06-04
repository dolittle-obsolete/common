/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_system_that_knows_about_no_resolvers } from "../given/dependencies_and_a_system_that_knows_about_no_resolvers";
import { CannotParseDependency } from "../../../index";

describe('and a dependency is resolved', async () => {
    let context = new dependencies_and_a_system_that_knows_about_no_resolvers();
    console.log(context.dependencyResolvers.resolvers);
    let exception = null;
    try {
        await context.dependencyResolvers.resolve({}, [context.promptDependency]);
    } catch (error) {
        exception = error;
    }
    it('Should throw an exception', () => expect(exception).to.not.be.null);
});