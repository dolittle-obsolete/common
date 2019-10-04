/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, PromptDependencyHasUserInputType } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency with user input type', () => {
    let validator = new PromptDependencyHasUserInputType();
    let dep = new PromptDependency('name', 'desc', [], 'some user input type', 'prompt');
    let result = validator.validate(dep as any);    
    
    it('Should not return anything', () => expect(result).to.be.undefined);
});