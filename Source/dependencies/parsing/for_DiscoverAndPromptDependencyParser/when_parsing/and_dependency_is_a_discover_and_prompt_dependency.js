/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverAndPromptDependencyParser, CannotParseDependency } from "../../../internal";
import {a_discover_and_prompt_dependency} from '../given/a_discover_and_prompt_dependency';

describe('and dependency is a discover and prompt dependency', () => {
    let context = new a_discover_and_prompt_dependency();
    let parser = new DiscoverAndPromptDependencyParser();
    let result = parser.parse(context.dependency, context.dependency.name);
    
    it('Should be able to parse dependency', () => expect(result).to.not.be.undefined);
    it('Should parse to the same dependency object', () => {
        expect(result.name).to.equal(context.dependency.name);
        expect(result.description).to.equal(context.dependency.description);
        expect(result.type).to.equal(context.dependency.type);
        expect(result.withNamespace).to.equal(context.dependency.withNamespace);
        expect(result.milestone.source).to.equal(context.dependency.milestone.source);
        expect(result.fileMatch).to.equal(context.dependency.fileMatch);
        expect(result.contentMatch).to.equal(context.dependency.contentMatch);
        expect(result.fromArea).to.equal(context.dependency.fromArea);
        expect(result.userInputType).to.equal(context.dependency.userInputType);
        expect(result.promptMessage).to.equal(context.dependency.promptMessage);
        expect(result.choices).to.equal(context.dependency.choices);
        expect(result.customInput).to.equal(context.dependency.customInput);
    });
});