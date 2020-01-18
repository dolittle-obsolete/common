/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasValidDiscoverType, DiscoverDependency, CannotValidateDependency, fileDiscoverType } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency with a valid discover type', () => {
    const validator = new DiscoverDependencyHasValidDiscoverType();
    const dep = new DiscoverDependency('name', 'desc', [], fileDiscoverType);
    const result = validator.validate(dep as any);

    it('Should not return anything', () => expect(result).to.be.undefined);
});
