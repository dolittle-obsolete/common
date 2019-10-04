/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, CannotValidateDependency, PromptDependencyHasValidUserInputType } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency without user input type', () => {
    let validator = new PromptDependencyHasValidUserInputType();
    let dep = new PromptDependency('name', 'desc', [], undefined, 'Prompt');
    let exception; 
    try {
        validator.validate(dep as any);    
    } catch(error) {
        exception = error;
        
    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw MissingField', () => exception.should.be.instanceof(CannotValidateDependency));
});