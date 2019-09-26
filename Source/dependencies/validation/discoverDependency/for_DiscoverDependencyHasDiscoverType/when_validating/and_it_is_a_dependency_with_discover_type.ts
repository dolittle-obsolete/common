/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasDiscoverType, DiscoverDependency, CannotValidateDependency } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency with discover type', () => {
    let validator = new DiscoverDependencyHasDiscoverType();
    let dep = new DiscoverDependency('name', 'desc', [], 'some discover type');
    let result = validator.validate(dep as any);    
    
    it('Should not return anything', () => expect(result).to.be.undefined);
});