/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

module.exports = {
    applications: require('./applications'),
    artifacts: require('./artifacts'),
    boundedContexts: require('./boundedContexts'),
    determineDestination: require('./helpers').determineDestination,
    dependencies: require('./dependencies')
};
