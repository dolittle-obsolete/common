/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, DiscoverDependencyHasMilestoneWhenDiscoveringNamespace, namespaceDiscoverType } from "../../../../internal";
import { expect } from "chai";

describe('and it has with namespace field', () => {
    let validator = new DiscoverDependencyHasMilestoneWhenDiscoveringNamespace();
    let dep = new DiscoverDependency('name', 'desc', [], 'some type', true);
    let result = validator.canValidate(dep as any);
    
    it('Should be able to validate dependency', () => result.should.be.equal(true));
});