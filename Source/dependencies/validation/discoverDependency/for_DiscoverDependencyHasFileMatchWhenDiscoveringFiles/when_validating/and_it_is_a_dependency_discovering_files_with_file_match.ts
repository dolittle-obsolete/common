/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency, DiscoverDependencyHasFileMatchWhenDiscoveringFiles, fileDiscoverType } from "../../../../internal";
import { expect } from "chai";

describe('and it is a dependency discovering files with file match', () => {
    let validator = new DiscoverDependencyHasFileMatchWhenDiscoveringFiles();
    let dep = new DiscoverDependency('name', 'desc', [], fileDiscoverType, undefined, undefined, 'some file match');
    let result = validator.validate(dep as any);    
    
    it('Should not return anything', () => expect(result).to.be.undefined);
});