/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasFileMatchWhenDiscoveringFiles, DiscoverDependency, MissingField, fileDiscoverType } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency discovering files with file match as empty string', () => {
    const validator = new DiscoverDependencyHasFileMatchWhenDiscoveringFiles();
    const dep = new DiscoverDependency('name', 'desc', [], fileDiscoverType, undefined, undefined, '');
    let exception: Error;
    try {
        validator.validate(dep as any);
    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.be.not.undefined);
    it('Should throw MissingField', () => exception.should.be.instanceof(MissingField));
});
