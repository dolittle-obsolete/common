import { ICanManageBoilerplates } from "../ICanManageBoilerplates";
import { ArtifactTemplate } from "./ArtifactTemplate";

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Manages the dependencies
 *
 * @export
 * @class DependenciesManager
 */
export interface ICanManageArtifacts extends ICanManageBoilerplates {
    /**
     * Creates an artifact base on the artifact template at the given destination
     * @param {any} context 
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationPath
     * @returns {{template: ArtifactTemplate, destination: string}} Returns the created template along with its destination
     * 
     */
    createArtifact(context: any, artifactTemplate: ArtifactTemplate, destinationPath: string): {template: ArtifactTemplate, destination: string}
}