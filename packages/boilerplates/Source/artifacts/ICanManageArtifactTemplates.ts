/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanManageBoilerplates } from "Source/ICanManageBoilerplates";
import { ArtifactTemplate } from "./ArtifactTemplate";

/**
 * Responsible for managing Artifact templates
 *
 * @export
 * @interface ICanManageArtifactTemplates
 */
export interface ICanManageArtifactTemplates extends ICanManageBoilerplates {
    
    /**
     * Creates an artifact base on the artifact template at the given destination
     * @param {any} context 
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {boolean} Whether or not the artifact was created successfully
     * @memberof ICanManageArtifactTemplates
     * 
     */
    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): boolean
}