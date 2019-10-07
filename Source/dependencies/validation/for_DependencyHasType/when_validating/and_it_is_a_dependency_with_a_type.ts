/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DependencyHasType } from "../../../internal";
import { expect } from "chai";
import { a_dependency } from "../given/a_dependency";

describe('and it is a dependency with a type', () => {
    let validator = new DependencyHasType();
    let dep = new a_dependency('name', 'desc', 'a type', []);
    let result = validator.validate(dep as any);    
    
    it('Should not return anything', () => expect(result).to.be.undefined);
});