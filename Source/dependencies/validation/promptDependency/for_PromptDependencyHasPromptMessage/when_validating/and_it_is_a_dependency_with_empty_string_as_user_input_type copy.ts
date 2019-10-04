/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyHasUserInputType, PromptDependency, MissingField } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency with empty string as user input type', () => {
    let validator = new PromptDependencyHasUserInputType();
    let dep = new PromptDependency('name', 'desc', [], '', 'prompt');
    let exception; 
    try {
        validator.validate(dep as any);    
    } catch(error) {
        exception = error;
    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw MissingField', () => exception.should.be.instanceof(MissingField));
});