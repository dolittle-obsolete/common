/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency,  MissingField, DiscoverDependencyHasValidDiscoverType, InvalidField, DiscoverDependencyHasValidArea } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency with an invalid from area', () => {
    let validator = new DiscoverDependencyHasValidArea();
    let dep = new DiscoverDependency('name', 'desc', [], 'some invalid field', undefined, undefined, undefined, undefined, 'some invalid area');
    let exception: Error; 
    try {
        validator.validate(dep as any);    
    } catch(error) {
        exception = error;
    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw InvalidField', () => exception.should.be.instanceof(InvalidField));
});