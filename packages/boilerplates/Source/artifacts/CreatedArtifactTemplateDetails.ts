/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ArtifactsBoilerplate, ArtifactTemplate } from '../internal';

 export type CreatedArtifactTemplateDetails = {
    /**
     * The parent boiler plate of the created artifact template
     *
     * @type {ArtifactsBoilerplate}
     */
    boilerplate: ArtifactsBoilerplate;
    
    /**
     * The artifact template that was created
     *
     * @type {ArtifactTemplate}
     */
    artifactTemplate: ArtifactTemplate;

    /**
     * The destination of of the created boiler plate
     *
     * @type {string}
     */
    destination: string;
 }