/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasValidDiscoverType, DiscoverDependency } from '../../../../internal';
import { expect } from 'chai';

describe('and it can validate dependency', () => {
    const validator = new DiscoverDependencyHasValidDiscoverType();
    const dep = new DiscoverDependency('name', 'desc', [], 'type');
    const result = validator.canValidate(dep);

    it('Should be able to validate dependency', () => result.should.be.equal(true));
});
