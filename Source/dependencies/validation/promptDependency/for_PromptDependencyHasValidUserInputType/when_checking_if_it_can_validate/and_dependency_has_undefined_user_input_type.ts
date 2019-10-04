/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyHasValidUserInputType, PromptDependency } from "../../../../internal";
import { expect } from "chai";

describe('and dependency has undefined user input type', () => {
    let validator = new PromptDependencyHasValidUserInputType();
    let dep = new PromptDependency('name', 'desc', [], undefined, 'prompt');
    let result = validator.canValidate(dep as any);
    
    it('Should not be able to validate dependency', () => result.should.be.equal(false));
});