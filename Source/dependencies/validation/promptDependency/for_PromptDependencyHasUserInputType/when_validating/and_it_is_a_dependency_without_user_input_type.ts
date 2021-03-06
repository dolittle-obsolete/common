/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, CannotValidateDependency, PromptDependencyHasPromptMessage } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency without user input type', () => {
    const validator = new PromptDependencyHasPromptMessage();
    const dep = new PromptDependency('name', 'desc', [], undefined as any, 'prompt');
    let exception: Error;
    try {
        validator.validate(dep as any);
    } catch (error) {
        exception = error;

    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw CannotValidateDependency', () => exception.should.be.instanceof(CannotValidateDependency));
});
