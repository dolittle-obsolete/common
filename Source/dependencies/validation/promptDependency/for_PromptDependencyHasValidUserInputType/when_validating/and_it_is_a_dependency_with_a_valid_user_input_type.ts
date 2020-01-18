/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependencyHasValidUserInputType, PromptDependency, argumentUserInputType } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency with a valid user input type', () => {
    const validator = new PromptDependencyHasValidUserInputType();
    const dep = new PromptDependency('name', 'desc', [], argumentUserInputType, 'prompt');
    const result = validator.validate(dep as any);

    it('Should not return anything', () => expect(result).to.be.undefined);
});
