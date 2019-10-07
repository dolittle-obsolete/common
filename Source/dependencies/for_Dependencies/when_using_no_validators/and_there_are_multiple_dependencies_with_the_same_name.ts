/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Dependencies, DiscoverDependency, namespaceDiscoverType, DuplicateDependencies } from "../../internal";
import { expect } from "chai";
import { no_validators } from "./given/no_validators";

describe('and there are multiple dependencies with the same name', () => {
    let exception: Error;
    let first_dependency = new DiscoverDependency('a dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    let second_dependency = new DiscoverDependency('a dependency', 'desc', [], namespaceDiscoverType,  undefined, 'some milestone');
    let dependencies = [
        first_dependency,
        second_dependency
    ]
    try {
        new Dependencies(dependencies, new no_validators());
    } catch (error) {
        exception = error;
    }

    it('Should throw an exception', () => expect(exception).to.not.be.undefined);
    it('Should throw InvalidField', () => exception.should.be.instanceof(DuplicateDependencies))
});