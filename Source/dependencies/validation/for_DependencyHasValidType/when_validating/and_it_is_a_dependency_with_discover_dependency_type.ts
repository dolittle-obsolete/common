/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DependencyHasValidType, discoverDependencyType } from '../../../internal';
import { expect } from 'chai';
import { a_dependency } from '../given/a_dependency';

describe('and it is a dependency discover dependency type', () => {
    const validator = new DependencyHasValidType();
    const dep = new a_dependency('name', 'desc', discoverDependencyType, []);
    const result = validator.validate(dep as any);

    it('Should not return anything', () => expect(result).to.be.undefined);
});
