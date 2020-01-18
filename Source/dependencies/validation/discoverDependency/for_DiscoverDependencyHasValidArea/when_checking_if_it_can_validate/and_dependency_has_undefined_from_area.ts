/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, DiscoverDependencyHasValidArea } from '../../../../internal';
import { expect } from 'chai';

describe('and dependency has undefined from area', () => {
    const validator = new DiscoverDependencyHasValidArea();
    const dep = new DiscoverDependency('name', 'desc', [], 'some type');
    const result = validator.canValidate(dep as any);

    it('Should not be able to validate dependency', () => result.should.be.equal(false));
});
