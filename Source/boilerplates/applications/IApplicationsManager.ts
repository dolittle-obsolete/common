/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Application } from '@dolittle/tooling.common.configurations';
import { NonArtifactsBoilerplate, CreatedApplicationDetails } from "../internal";

/**
 * Manages the application boiler plates
 *
 * @export
 * @interface IApplicationsManager
 */
export interface IApplicationsManager {
    /**
     * Gets all the application boilerplates 
     *
     * @type {NonArtifactsBoilerplate[]}
 
     */
    boilerplates: NonArtifactsBoilerplate[]
    /**
     * Whether or not there are any application boilerplates
     *
     * @type {boolean}
 
     */
    hasBoilerplate: boolean
    /**
     * Gets the application configuration from the given folder
     * @param {string} folder path 
     * @returns {Application | null} application config or null if not found
 
     */
    getApplicationFrom(folder: string): Application | null
    /**
     * Check if an application has been setup in the given folder.
     * @param {string} folder path
     * @returns {boolean} whether or not the application configuration is set up
 
     */
    hasApplication(folder: string): boolean

    /**
     * Retrieves the boilerplate configurations for application with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {NonArtifactsBoilerplate[]} The application {Boilerplate} with of the given language
 
     */
    boilerplatesByLanguage(language: string, namespace?: string): NonArtifactsBoilerplate[]
    /**
     * Creates a dolittle application based
     *
     * @param {any} context The template context 
     * @param {string} destinationPath The absolute path of the destination of the application
     * @param {NonArtifactsBoilerplate} boilerplate The boilerplate to create the application from
     * @returns {CreatedApplicationDetails[]} Boilerplates created with the destination
 
     */
    createApplication(context: any, destinationPath: string, boilerplate: NonArtifactsBoilerplate): CreatedApplicationDetails[]
}