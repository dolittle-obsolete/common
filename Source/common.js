/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from './globals';
import { Dependency } from './dependencies/Dependency';
import { Cluster } from './configuration/Cluster';
import { Config } from './configuration/Config';
import { ConfigManager } from './configuration/ConfigManager';
import { ConfigParser } from './configuration/ConfigParser';
import { BoilerPlate } from './boilerPlates/BoilerPlate';
import { BoilerPlatesManager } from './boilerPlates/BoilerPlatesManager';
import { ArtifactTemplate } from './artifacts/ArtifactTemplate';
import { Folders } from './Folders';
import { Guid } from './Guid';


module.exports = {
    ArtifactTemplate,
    BoilerPlate,
    BoilerPlatesManager,
    Cluster,
    Config,
    ConfigManager,
    ConfigParser,
    Dependency,
    Folders,
    Guid,
    globals,
    applications: require('./applications'),
    artifacts: require('./artifacts'),
    boundedContexts: require('./boundedContexts'),
    dependencies: require('./dependencies'),
    helpers: require('./helpers')
};

