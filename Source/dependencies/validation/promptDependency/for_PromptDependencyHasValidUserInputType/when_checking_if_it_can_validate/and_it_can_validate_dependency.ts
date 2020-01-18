/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyHasValidUserInputType, PromptDependency } from '../../../../internal';
import { expect } from 'chai';

describe('and it can validate dependency', () => {
    const validator = new PromptDependencyHasValidUserInputType();
    const dep = new PromptDependency('name', 'desc', [], 'user input type', 'prompt');
    const result = validator.canValidate(dep);

    it('Should be able to validate dependency', () => result.should.be.equal(true));
});
