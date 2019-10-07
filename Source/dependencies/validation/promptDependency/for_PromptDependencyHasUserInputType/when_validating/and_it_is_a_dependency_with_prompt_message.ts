/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, PromptDependencyHasPromptMessage } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency with user prompt message', () => {
    let validator = new PromptDependencyHasPromptMessage();
    let dep = new PromptDependency('name', 'desc', [], 'user input type', 'some prompt message');
    let result = validator.validate(dep as any);    
    
    it('Should not return anything', () => expect(result).to.be.undefined);
});