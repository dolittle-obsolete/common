import { a_system_that_has_a_boilerplate_with_a_dependency } from "./given/a_system_that_has_a_boilerplate_with_a_dependency";
import { BoilerPlate } from "../../boilerPlates/BoilerPlate";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 describe('when getting boilerplate by language when there is one boilerplate for given language', () => {
    let context = new a_system_that_has_a_boilerplate_with_a_dependency();
    /**
     * @type {BoilerPlate}
     */
    let result = null;
    beforeEach(() => {
        result = context.artifacts_manager.boilerPlateByLanguage(context.language);
        
    });
    
    it('should return a boilerplate', () => expect(result).to.not.be.null);
 });