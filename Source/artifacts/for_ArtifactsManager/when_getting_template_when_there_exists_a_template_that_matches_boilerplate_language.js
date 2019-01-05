/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_has_a_boilerplate_with_a_dependency } from "./given/a_system_that_has_a_boilerplate_with_a_dependency";
import { BoilerPlate } from "../../boilerPlates/BoilerPlate";
import { ArtifactTemplate } from "../ArtifactTemplate";


 describe('when getting template hen there exists a template that matches boilerplate language', () => {
    let context = new a_system_that_has_a_boilerplate_with_a_dependency();
    /**
     * @type {ArtifactTemplate}
     */
    let result = null;
    beforeEach(() => {
        
        let boilerplate = context.artifacts_manager.boilerPlateByLanguage(context.language);
        result = context.artifacts_manager.templateByBoilerplate(boilerplate, context.artifact_type);
    });
    
    it('should return an ArtifactTemplate', () => expect(result).to.not.be.null);
 });