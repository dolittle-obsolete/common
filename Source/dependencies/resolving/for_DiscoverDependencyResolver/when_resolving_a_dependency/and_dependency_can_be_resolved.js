/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_discover_dependency_resolver } from "../given/dependencies_and_a_discover_dependency_resolver";

describe('and dependency can be resolved', () => {
    let context = new dependencies_and_a_discover_dependency_resolver();
    let result;

    before(async () => {
        result = await context.discoverDependencyResolver.resolve({}, [context.discoverDependency], 'path', 'lang')
    });
    
    it('Should be able to resolve', () => expect(result).to.not.be.undefined);
    it('Should resolve to a context with one key', () => expect(Object.keys(result).length).to.be.equal(1));
    it('Should resolve to a context with a key that is the name of the dependency', () => expect(result[context.discoverDependency.name]).to.not.be.undefined);
    it(`Should resolve to a context with a key that has the value 'something'`, () => expect(result[context.discoverDependency.name]).to.be.equal('something'));
});