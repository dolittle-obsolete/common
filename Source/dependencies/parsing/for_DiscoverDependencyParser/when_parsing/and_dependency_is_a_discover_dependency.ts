/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependencyParser, IRulesParser } from "../../../internal";
import {a_discover_dependency} from '../given/a_discover_dependency';
import Substitute from "@fluffy-spoon/substitute";
import { expect } from "chai";

describe('and dependency is a discover dependency', () => {
    let context = new a_discover_dependency();
    let parser = new DiscoverDependencyParser(Substitute.for<IRulesParser>());
    let result = parser.parse(context.dependency, context.dependency.name);
    it('Should be able to parse dependency', () => expect(result).to.not.be.undefined);
    it('Should parse to the same dependency object', () => {
        expect(result.name).to.equal(context.dependency.name);
        expect(result.description).to.equal(context.dependency.description);
        expect(result.type).to.equal(context.dependency.type);
        expect(result.withNamespace).to.equal(context.dependency.withNamespace);
        expect(result.milestone!.source).to.equal(context.dependency.milestone!.source);
        expect(result.fileMatch).to.equal(context.dependency.fileMatch);
        expect(result.contentMatch).to.equal(context.dependency.contentMatch);
        expect(result.fromArea).to.equal(context.dependency.fromArea);
    });
});