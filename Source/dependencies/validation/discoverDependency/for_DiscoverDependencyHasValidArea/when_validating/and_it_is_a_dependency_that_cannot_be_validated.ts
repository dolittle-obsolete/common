/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasValidDiscoverType, PromptDependency, CannotValidateDependency, DiscoverDependencyHasValidArea } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency that cannot be validated', () => {
    const validator = new DiscoverDependencyHasValidArea();
    const dep = new PromptDependency('name', 'desc', [], 'type', 'prompt');
    let exception: Error;

    try {
        validator.validate(dep as any);
    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw CannotValidateDependency', () => exception.should.be.instanceof(CannotValidateDependency));
});
