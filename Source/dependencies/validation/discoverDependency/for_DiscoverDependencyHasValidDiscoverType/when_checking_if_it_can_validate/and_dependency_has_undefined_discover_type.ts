/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasValidDiscoverType, DiscoverDependency } from "../../../../internal";
import { expect } from "chai";

describe('and dependency has undefined discover type', () => {
    let validator = new DiscoverDependencyHasValidDiscoverType();
    let dep = new DiscoverDependency('name', 'desc', [], undefined as any);
    let result = validator.canValidate(dep as any);
    
    it('Should not be able to validate dependency', () => result.should.be.equal(false));
});