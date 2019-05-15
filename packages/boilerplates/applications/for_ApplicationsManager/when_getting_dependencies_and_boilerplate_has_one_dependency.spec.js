/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_has_an_application_and_a_boilerplate_with_a_dependency } from "./given/a_system_that_has_an_application_and_a_boilerplate_with_a_dependency.given";
import { Dependency } from "../../dependencies/Dependency";

 describe('when getting dependencies and boilerplate has one dependency', () => {
    let context = new a_system_that_has_an_application_and_a_boilerplate_with_a_dependency();
    /**
     * @type {Dependency[]}
     */
    let result = null;
    beforeEach(() => {
        result = context.applications_manager.getDependencies(context.artifact_type, context.language);
    });
    
    it('should return a single dependency', () => result.length.should.equal(1));
 });