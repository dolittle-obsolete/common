/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_has_an_application_and_a_boilerplate_with_a_dependency } from "./given/a_system_that_has_an_application_and_a_boilerplate_with_a_dependency.given";

import { Application } from "../Application";

describe('when getting application from an application manager that has an application', () => {
   let context = new a_system_that_has_an_application_and_a_boilerplate_with_a_dependency();
   
   /**
    * @type {Application}
    */
   let result = null;
   beforeEach(() => {
      result = context.applications_manager.getApplicationFrom('some/folder');
   });
   it('should have an application', () => expect(context.applications_manager.hasApplication('some/folder')).to.be.true);
   it('should not return null', () => expect(result).to.not.be.null);
   it('should return the correct application configuration', () => {
         result.id.should.be.equal(context.application_json.id);
         result.name.should.be.equal(context.application_json.name);
      });
});