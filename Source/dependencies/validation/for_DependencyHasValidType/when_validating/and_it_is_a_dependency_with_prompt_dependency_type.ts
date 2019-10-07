/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DependencyHasValidType, promptDependencyType } from "../../../internal";
import { expect } from "chai";
import { a_dependency } from "../given/a_dependency";

describe('and it is a dependency prompt dependency type', () => {
    let validator = new DependencyHasValidType();
    let dep = new a_dependency('name', 'desc', promptDependencyType, []);
    let result = validator.validate(dep as any);    
    
    it('Should not return anything', () => expect(result).to.be.undefined);
});