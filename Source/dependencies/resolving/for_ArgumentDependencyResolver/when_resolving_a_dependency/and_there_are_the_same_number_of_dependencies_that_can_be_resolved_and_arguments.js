/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_an_argument_dependency_resolver } from "../given/dependencies_and_an_argument_dependency_resolver";

describe('and there are the same number of dependencies that can be resolved and arguments', () => {
    let context = new dependencies_and_an_argument_dependency_resolver();
    const resolvedValue = 'something';
    let result = context.argumentDependencyResolver.resolve({}, [context.argumentDependency], undefined, undefined, [resolvedValue]);
    
    it('Should be able to resolve', expect(result).to.not.be.undefined);
    it('Should resolve to a context with one key', expect(Object.keys(result).length).to.be.equal(1));
    it('Should resolve to a context with a key that is the name of the dependency', () => expect(result[context.discoverDependency.name]).to.not.be.undefined);
    it(`Should resolve to a context with a key that has the value 'something'`, () => expect(result[context.discoverDependency.name]).to.be.equal(resolvedValue));
});