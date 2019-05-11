/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate } from "./ArtifactTemplate";
import { ArtifactsBoilerplate } from "../ArtifactsBoilerplate";
import { CreatedArtifactTemplateDetails } from "./CreatedArtifactTemplateDetails";

/**
 * Responsible for managing Artifact templates
 *
 * @export
 * @interface IArtifactTemplatesManager
 */
export interface IArtifactTemplatesManager {
    /**
     * Gets all the artifact template boilerplates 
     *
     * @type {ArtifactsBoilerplate[]}
     * @memberof IArtifactTemplatesManager
     */
    boilerplates: ArtifactsBoilerplate[]

    /**
     * Whether or not there are any artifact template boilerplates
     *
     * @type {boolean}
     * @memberof IArtifactTemplatesManager
     */
    hasBoilerplate: boolean

    /**
     * Retrieves the boilerplate configurations for artifact templates with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {ArtifactsBoilerplate[]} The artifact boilerplates with of the given language
     * @memberof IArtifactTemplatesManager
     */
    boilerplatesByLanguage(language: string, namespace?: string): ArtifactsBoilerplate[]
    
    /**
     * Creates an artifact base on the artifact template at the given destination
     * @param {any} context 
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {boolean} Whether or not the artifact was created successfully
     * @memberof IArtifactTemplatesManager
     * 
     */
    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): CreatedArtifactTemplateDetails
}