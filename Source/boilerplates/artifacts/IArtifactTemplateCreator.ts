/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactTemplate } from "../internal";

/**
 * Responsible for creating Artifact templates
 *
 * @export
 * @interface IArtifactTemplateCreator
 */
export interface IArtifactTemplateCreator {

    /**
     * Create an artifact based of an artifact into a specific destination folder with a given context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destination 
     * @param {any} context 
     */
    createArtifactBoilerplate(artifactTemplate: ArtifactTemplate, destination: string, context: any): void
}