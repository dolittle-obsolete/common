/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from './globals';
import { Guid } from './Guid';

/**
 * Creates a dolittle application based on the boilerplates provided in your .dolittle folder in your user's root directory
 *
 * @param {{name: string}} context The template context 
 * @param {string} destinationPath The absolute path of the destination of the application
 */
export function createApplication(context, destinationPath) {
    globals.logger.info(`Creating application with name '${context.applicationName}'`);
    
    let boilerPlate = globals.boilerPlatesManager.boilerPlatesByType('application')[0];

    if (boilerPlate === undefined) {
        globals.logger.error('No boilerplate found with type \'application\'');
        throw 'Missing boilerplate';
    }
    context.id = Guid.create();

    globals.folders.makeFolderIfNotExists(destinationPath);
    
    globals.boilerPlatesManager.createInstance(boilerPlate, destinationPath, context);
}

