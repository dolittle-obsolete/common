/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyHasMilestoneWhenDiscoveringNamespace, DiscoverDependency, MissingField, fileDiscoverType, namespaceDiscoverType } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency discovering namespace with milestone as empty string', () => {
    let validator = new DiscoverDependencyHasMilestoneWhenDiscoveringNamespace();
    let dep = new DiscoverDependency('name', 'desc', [], namespaceDiscoverType, undefined, '');
    let exception;
    try {
        validator.validate(dep as any);
    } catch (error) {
        exception = error;
    }
    
    it('Should throw and exception', () => expect(exception).to.not.be.undefined);
    it('Should throw MissingField', () => exception.should.be.instanceof(MissingField));
});