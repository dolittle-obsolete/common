/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, DiscoverDependencyHasFileMatchWhenDiscoveringFiles, fileDiscoverType } from '../../../../internal';
import { expect } from 'chai';

describe('and it can validate dependency', () => {
    const validator = new DiscoverDependencyHasFileMatchWhenDiscoveringFiles();
    const dep = new DiscoverDependency('name', 'desc', [], fileDiscoverType);
    const result = validator.canValidate(dep);

    it('Should be able to validate dependency', () => result.should.be.equal(true));
});
