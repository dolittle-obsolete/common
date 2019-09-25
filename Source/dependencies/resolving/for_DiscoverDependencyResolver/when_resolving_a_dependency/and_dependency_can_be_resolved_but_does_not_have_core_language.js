/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_discover_dependency_resolver } from "../given/dependencies_and_a_discover_dependency_resolver";
import { MissingCoreLanguage } from "../../../internal";

describe('and dependency can be resolved but does not have core language', () => {
    let context = new dependencies_and_a_discover_dependency_resolver();
    let exception = null;
    before(async () => {
        try {
            await context.discoverDependencyResolver.resolve({}, [context.discoverDependency], 'something');
        }
        catch (error) {
            exception = error;
        }
    });

    it('should throw exception', () => expect(exception).to.not.be.undefined);
    it('Should throw a MissingCoreLanguage exception', () => exception.should.be.instanceof(MissingCoreLanguage));

});