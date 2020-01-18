/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasValidDiscoverType, DiscoverDependency, CannotValidateDependency, fileDiscoverType, DiscoverDependencyHasValidArea } from '../../../../internal';
import { expect } from 'chai';

describe('and it is a dependency with a valid from area', () => {
    const validator = new DiscoverDependencyHasValidArea();
    const dep = new DiscoverDependency('name', 'desc', [], 'some type', undefined, undefined, undefined, undefined, 'read');
    const result = validator.validate(dep);

    it('Should not return anything', () => expect(result).to.be.undefined);
});
