/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, DiscoverDependencyHasMilestoneWhenDiscoveringNamespace, fileDiscoverType, namespaceDiscoverType } from "../../../../internal";
import { expect } from "chai";

describe('and it can validate dependency', () => {
    let validator = new DiscoverDependencyHasMilestoneWhenDiscoveringNamespace();
    let dep = new DiscoverDependency('name', 'desc', [], namespaceDiscoverType, true);
    let result = validator.canValidate(dep);
    
    it('Should be able to validate dependency', () => result.should.be.equal(true));
});