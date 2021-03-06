/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyHasValidUserInputType, PromptDependency } from '../../../../internal';
import { expect } from 'chai';

describe('and dependency has undefined user input type', () => {
    const validator = new PromptDependencyHasValidUserInputType();
    const dep = new PromptDependency('name', 'desc', [], undefined as any, 'prompt');
    const result = validator.canValidate(dep as any);

    it('Should not be able to validate dependency', () => result.should.be.equal(false));
});
