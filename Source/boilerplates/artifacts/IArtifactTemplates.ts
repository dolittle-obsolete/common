/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate, ArtifactsBoilerplate, CreatedArtifactTemplateDetails } from "../index";

/**
 * Defines a system that knows about (ArtifactsBoilerplate) that can create {ArtifactTemplate}
 *
 * @export
 * @interface IArtifacts
 */
export interface IArtifactTemplates {

    /**
     * Gets all the artifact template boilerplates 
     *
     * @type {ArtifactsBoilerplate[]}
     */
    boilerplates: ArtifactsBoilerplate[]

    /**
     * Retrieves the boilerplate configurations for artifact templates with the given language
     * 
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {ArtifactsBoilerplate[]} The artifact boilerplates with of the given language
     */
    boilerplatesByLanguage(language: string, namespace?: string): ArtifactsBoilerplate[]
    
    /**
     * Creates an artifact base on the artifact template at the given destination
     * 
     * @param {any} context 
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {boolean} Whether or not the artifact was created successfully
     */
    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): CreatedArtifactTemplateDetails
}