/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { BoilerplatesConfig, IApplicationsManager, IArtifactTemplatesManager, IBoilerplateDiscoverers, IBoilerplateManagers, IBoundedContextsManager, ICanFindOnlineBoilerplatePackages } from "@dolittle/tooling.common.boilerplates";
import { ProjectConfig } from '@dolittle/tooling.common.configurations';
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";
import { Folders } from "@dolittle/tooling.common.utilities";
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
     * @memberof CommandContext
     */
    constructor(dolittleConfig: any, projectConfig: ProjectConfig, boilerplatesConfig: BoilerplatesConfig,
        applicationsManager: IApplicationsManager, artifactTemplatesManager: IArtifactTemplatesManager, boundedContextsManager: IBoundedContextsManager,
        dependencyResolvers: IDependencyResolvers, boilerplateManagers: IBoilerplateManagers, boilerplateDiscoverers: IBoilerplateDiscoverers, 
        onlineBoilerplateDiscoverer: ICanFindOnlineBoilerplatePackages, folders: Folders, fileSystem: typeof FsExtra) {
        
        this.dolittleConfig = dolittleConfig;
        this.projectConfig = projectConfig;
        this.boilerplatesConfig = boilerplatesConfig;
        this.applicationsManager = applicationsManager;
        this.artifactTemplatesManager = artifactTemplatesManager;
        this.boundedContextsManager = boundedContextsManager;
        this.dependencyResolvers = dependencyResolvers;
        this.boilerplateManagers = boilerplateManagers;
        this.boilerplateDiscoverers = boilerplateDiscoverers;
        this.onlineBoilerplateDiscoverer = onlineBoilerplateDiscoverer;
        this.folders = folders;
        this.fileSystem = fileSystem;   
    }
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
     * The applications manager
     */
    readonly applicationsManager: IApplicationsManager
    /**
     * The artifact templates manager
     */
    readonly artifactTemplatesManager: IArtifactTemplatesManager
    /**
     * The bounded contexts manager
     */
    readonly boundedContextsManager: IBoundedContextsManager
    /**
     * The dependency resolvers
     */
    readonly dependencyResolvers: IDependencyResolvers 
    /**
     * The boilerplate managers
     */
    readonly boilerplateManagers: IBoilerplateManagers 
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
