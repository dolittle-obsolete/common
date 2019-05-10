/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_has_an_application_and_a_boilerplate_with_a_dependency } from "./given/a_system_that_has_an_application_and_a_boilerplate_with_a_dependency.given";
import { Boilerplate } from "../../boilerplates/Boilerplate";

describe('when getting boilerplate by language when there is one boilerplate for given language', () => {
    let context = new a_system_that_has_an_application_and_a_boilerplate_with_a_dependency();
    /**
     * @type {Boilerplate}
     */
    let result = null;
    beforeEach(() => {
        result = context.applications_manager.boilerplateByLanguage(context.language);
        
    });

    it('should return a boilerplate', () => expect(result).to.not.be.null);
    it('should have the correct language', () => result.language.should.be.equal(context.language));
});