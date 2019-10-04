/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, PromptDependencyHasUserInputType } from "../../../../internal";
import { expect } from "chai";

describe('and it can validate dependency', () => {
    let validator = new PromptDependencyHasUserInputType();
    let dep = new PromptDependency('name', 'desc', [], 'type', 'prompt');
    let result = validator.canValidate(dep);
    
    it('Should be able to validate dependency', () => result.should.be.equal(true));
});