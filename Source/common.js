import { ArtifactTemplate } from './artifacts/ArtifactTemplate';
import { BoilerPlate } from './boilerPlates/BoilerPlate';
import { Cluster } from './configuration/Cluster';
import { Config } from './configuration/Config';
import { Dependency } from './dependencies/Dependency';
import { Guid } from './Guid';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

module.exports.ArtifactTemplate = ArtifactTemplate;
module.exports.BoilerPlate = BoilerPlate;
module.exports.Cluster = Cluster;
module.exports.Config = Config;
module.exports.Dependency = Dependency;
module.exports.Guid = Guid;

export default {
    applications: require('./applications'),
    artifacts: require('./artifacts'),
    boundedContexts: require('./boundedContexts'),
    dependencies: require('./dependencies'),
    globals: require('./globals').default,
    helpers: require('./helpers')
};