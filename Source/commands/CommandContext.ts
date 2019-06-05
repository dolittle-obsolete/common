/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatesConfig, IApplicationsManager, IBoilerplateDiscoverers, IBoundedContextsManager, ICanFindOnlineBoilerplatePackages, ProjectConfig, IBoilerplates, ITemplatesBoilerplates, IContentBoilerplates } from "@dolittle/tooling.common.boilerplates";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { Folders } from "@dolittle/tooling.common.files";
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import * as FsExtra from 'fs-extra';

/**
 * The context needed by commands to perform their actions
 *
 * @export
 * @class CommandContext
 */
export class CommandContext {

    /**
     * Creates an instance of CommandContext.
     * @param {ICanOutputMessages} outputter
     * @param {*} dolittleConfig
     * @param {ProjectConfig} projectConfig
     * @param {BoilerplatesConfig} boilerplatesConfig
     * @param {IApplicationsManager} applicationsManager
     * @param {IArtifactTemplatesManager} artifactTemplatesManager
     * @param {IBoundedContextsManager} boundedContextsManager
     * @param {IDependencyResolvers} dependencyResolvers
     * @param {IBoilerplateManagers} boilerplateManagers
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     */
    constructor(outputter: ICanOutputMessages, dolittleConfig: any, projectConfig: ProjectConfig, boilerplatesConfig: BoilerplatesConfig,
            boilerplates: IBoilerplates, templatesBoilerplates: ITemplatesBoilerplates, contentBoilerplates: IContentBoilerplates,
        dependencyResolvers: IDependencyResolvers, boilerplateDiscoverers: IBoilerplateDiscoverers, 
        onlineBoilerplateDiscoverer: ICanFindOnlineBoilerplatePackages, folders: Folders, fileSystem: typeof FsExtra) {
        this.outputter = outputter;
        this.dolittleConfig = dolittleConfig;
        this.projectConfig = projectConfig;
        this.boilerplatesConfig = boilerplatesConfig;
        this.boilerplates = boilerplates;
        this.templatesBoilerplates = templatesBoilerplates;
        this.contentBoilerplates = contentBoilerplates;
        this.dependencyResolvers = dependencyResolvers;
        this.boilerplateDiscoverers = boilerplateDiscoverers;
        this.onlineBoilerplateDiscoverer = onlineBoilerplateDiscoverer;
        this.folders = folders;
        this.fileSystem = fileSystem;
    }

    /**
     * The system that can output messages
     */
    readonly outputter: ICanOutputMessages

    /**
     * The dolittle config
     */
    readonly dolittleConfig: any

    /**
     * The project configuration object
     */
    readonly projectConfig: ProjectConfig

    /**
     * The boilerplates configuration object
     */
    readonly boilerplatesConfig: BoilerplatesConfig

    /**
     * The boilerplates
     *
     * @type {IBoilerplates}
     */
    readonly boilerplates: IBoilerplates

    /**
     * The templates boilerplates
     *
     * @type {ITemplatesBoilerplates}
     */
    readonly templatesBoilerplates: ITemplatesBoilerplates

    /**
     * The content boilerplates
     *
     * @type {IContentBoilerplates}
     */
    readonly contentBoilerplates: IContentBoilerplates

    /**
     * The dependency resolvers
     */
    readonly dependencyResolvers: IDependencyResolvers 

    /**
     * The boilerplate discoverers
     */
    readonly boilerplateDiscoverers: IBoilerplateDiscoverers

    /**
     * The instance that can find online boilerplates
     */
    readonly onlineBoilerplateDiscoverer: ICanFindOnlineBoilerplatePackages
    
    /**
     * The filesystem
     */
    readonly fileSystem: typeof FsExtra 

    /**
     * The folders object
     */
    readonly folders: Folders
}
