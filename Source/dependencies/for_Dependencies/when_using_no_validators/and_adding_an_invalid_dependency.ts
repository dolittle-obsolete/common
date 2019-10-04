/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, DiscoverDependency, InvalidField } from "../../internal";
import { expect } from "chai";
import { no_validators } from "./given/no_validators";

describe('and adding a valid dependency', () => {
    let dependency =  new DiscoverDependency('name', 'desc', [], 'invalid discover type');
    
    let dependencies = new Dependencies([], new no_validators());
    dependencies.add(dependency)
    
    it('Should create an instance of Dependencies', () => expect(dependencies).to.not.be.undefined);
    it('Dependencies should contain the dependency', () => dependencies.dependencies.includes(dependency).should.be.true);

});