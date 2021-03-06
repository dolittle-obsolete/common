/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, MissingField, PromptDependencyHasPromptMessage } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency with string with only spaces as prompt message', () => {
    const validator = new PromptDependencyHasPromptMessage();
    const dep = new PromptDependency('name', 'desc', [], 'user input type', '    ');
    let exception: Error;
    try {
        validator.validate(dep as any);
    } catch (error) {
        exception = error;
    }
    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw MissingField', () => exception.should.be.instanceof(MissingField));
});
