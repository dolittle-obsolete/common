/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_an_argument_dependency_resolver } from "../given/dependencies_and_an_argument_dependency_resolver";

describe('and there are no dependencies and no arguments', () => {
    let context = new dependencies_and_an_argument_dependency_resolver();
    let result = context.argumentDependencyResolver.resolve({}, [], undefined, undefined, []);
    
    it('Should be able to resolve', expect(result).to.not.be.undefined);
    it('Should resolve to a context with no keys', expect(Object.keys(result).length).to.be.equal(0));
});