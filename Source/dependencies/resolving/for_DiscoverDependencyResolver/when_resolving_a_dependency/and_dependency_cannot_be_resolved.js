/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_discover_dependency_resolver } from "../given/dependencies_and_a_discover_dependency_resolver";
import { CannotResolveDependency } from "../../../index";

describe('and dependency cannot be resolved', () => {
    let context = new dependencies_and_a_discover_dependency_resolver();
    let exception = null;
    try {
        context.discoverDependencyResolver.resolve({}, [context.promptDependency], 'path', 'lang');
    } catch (error) {
        exception = error;
    }
    
    it('Should throw an exception', expect(exception).to.not.be.undefined);
    it('Should throw a CannotResolveDependencyError', () => exception.should.be.instanceof(CannotResolveDependency))
});