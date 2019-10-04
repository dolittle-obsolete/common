/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, DiscoverDependency, namespaceDiscoverType } from "../../internal";
import { expect } from "chai";
import { no_validators } from "./given/no_validators";

describe('and there is a non valid dependency', () => {
    let a_valid_dependency = new DiscoverDependency('valid dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    let an_invalid_dependency =  new DiscoverDependency('name', 'desc', [], 'invalid discover type');
    let dependencies = [
       a_valid_dependency,
       an_invalid_dependency
    ]
   
    let result = new Dependencies(dependencies, new no_validators());
    
    it('Should create an instance of Dependencies', () => expect(result).to.not.be.undefined);
    it('Dependencies should contain the valid dependency', () => result.dependencies.includes(a_valid_dependency).should.be.true);
    it('Dependencies should contain the invalid dependency', () => result.dependencies.includes(an_invalid_dependency).should.be.true);
});