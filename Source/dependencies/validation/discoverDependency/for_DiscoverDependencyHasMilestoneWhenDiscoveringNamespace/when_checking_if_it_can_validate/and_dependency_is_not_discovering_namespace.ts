/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, DiscoverDependencyHasMilestoneWhenDiscoveringNamespace } from "../../../../internal";
import { expect } from "chai";

describe('and dependency is not discovering namespace', () => {
    let validator = new DiscoverDependencyHasMilestoneWhenDiscoveringNamespace();
    let dep = new DiscoverDependency('name', 'desc', [], 'some type', false);
    let result = validator.canValidate(dep as any);
    
    it('Should not be able to validate dependency', () => result.should.be.equal(false));
});