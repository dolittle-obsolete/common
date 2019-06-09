/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_an_argument_dependency_resolver } from "../given/dependencies_and_an_argument_dependency_resolver";
import { ArgumentsNotMatchingDependencies } from "../../../index";

describe('and there are not the same number of dependencies that can be resolved and arguments', () => {
    let context = new dependencies_and_an_argument_dependency_resolver();
    let exception = null;
    try {
        context.argumentDependencyResolver.resolve({}, [context.argumentDependency], undefined, undefined, ['something', 'something_else']);

    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.not.be.null);
    it('Should throw a ArgumentsNotMatchingDependencies exception', exception.should.be.instanceof(ArgumentsNotMatchingDependencies))
    
});