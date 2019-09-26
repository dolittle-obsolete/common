/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, CannotValidateDependency, DiscoverDependencyHasValidDiscoverType } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency without discover type', () => {
    let validator = new DiscoverDependencyHasValidDiscoverType();
    let dep = new DiscoverDependency('name', 'desc', [], undefined);
    let exception; 
    try {
        validator.validate(dep as any);    
    } catch(error) {
        exception = error;
        
    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw MissingField', () => exception.should.be.instanceof(CannotValidateDependency));
});