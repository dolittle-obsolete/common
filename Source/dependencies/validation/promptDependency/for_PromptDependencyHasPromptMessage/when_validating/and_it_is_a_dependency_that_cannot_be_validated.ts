/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CannotValidateDependency, PromptDependencyHasUserInputType, DiscoverDependency } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency that cannot be validated', () => {
    let validator = new PromptDependencyHasUserInputType();
    let dep = new DiscoverDependency('name', 'desc', [], 'type');
    let exception;

    try {
        validator.validate(dep as any);    
    } catch(error) {
        exception = error;
    }
    
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw CannotValidateDependency', () => exception.should.be.instanceof(CannotValidateDependency));
});