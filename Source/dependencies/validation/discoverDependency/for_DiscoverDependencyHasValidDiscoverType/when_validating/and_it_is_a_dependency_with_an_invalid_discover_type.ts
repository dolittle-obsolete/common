/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency,  MissingField, DiscoverDependencyHasValidDiscoverType, InvalidField } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency with an invalid discover type', () => {
    let validator = new DiscoverDependencyHasValidDiscoverType();
    let dep = new DiscoverDependency('name', 'desc', [], 'some invalid field');
    let exception: Error; 
    try {
        validator.validate(dep as any);    
    } catch(error) {
        exception = error;
    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw InvalidField', () => exception.should.be.instanceof(InvalidField));
});