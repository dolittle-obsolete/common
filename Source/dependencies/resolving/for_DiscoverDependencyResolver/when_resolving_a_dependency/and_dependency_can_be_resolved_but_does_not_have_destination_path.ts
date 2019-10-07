/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { dependencies_and_a_discover_dependency_resolver } from "../given/dependencies_and_a_discover_dependency_resolver";
import { MissingDestinationPath } from "../../../internal";
import { expect } from "chai";

describe('and dependency can be resolved but does not have destination path', () => {
    let context = new dependencies_and_a_discover_dependency_resolver();
    let exception: Error;;
    before(async () => {
        try {
            await context.discoverDependencyResolver.resolve({}, [context.discoverDependency], [], undefined, 'lang');

        } catch(error) {
            exception = error;
        }
    });
    
    
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw a MissingDestinationPath exception', () => exception.should.be.instanceof(MissingDestinationPath));

});