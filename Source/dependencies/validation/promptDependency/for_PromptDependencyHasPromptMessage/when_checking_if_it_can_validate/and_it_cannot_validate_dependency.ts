/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyHasPromptMessage, DiscoverDependency } from "../../../../internal";
import { expect } from "chai";

describe('and it cannot validate dependency', () => {
    let validator = new PromptDependencyHasPromptMessage();
    let dep = new DiscoverDependency('name', 'desc', [], 'type');
    let result = validator.canValidate(dep as any);
    
    it('Should not be able to validate dependency', () => result.should.be.equal(false));
});