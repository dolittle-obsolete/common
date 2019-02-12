
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { artifactTemplateFromJson, ArtifactTemplate } from "../ArtifactTemplate";
import { an_artifact_template_json_with_dependencies } from "./given/an_artifact_template_json_with_dependencies.given";


 describe('when reading artifact template with dependencies from json', () => {
    let context = new an_artifact_template_json_with_dependencies();
    /**
     * @type {ArtifactTemplate}
     */
    let result = artifactTemplateFromJson(context.artifact_template_json, context.path, context.included_files, context.boilerplate);
    console.log(result.boilerplate.language)
    
    it('should have the correct name', () => result.name.should.equal(context.artifact_template_json.name));
    it('should have the correct type', () => result.type.should.equal(context.artifact_template_json.type));
    it('should have the correct area', () => result.area.should.equal(context.artifact_template_json.area));
    it('should have the correct description', () => result.description.should.equal(context.artifact_template_json.description));
    it('should have the correct language', () => result.boilerplate.language.should.equal(context.boilerplate.language));
    it('should have the correct includedFiles', () => result.includedFiles.should.equal(context.included_files));
    it('should have the correct number of dependencies', () => result.dependencies.length.should.equal(1));

 });