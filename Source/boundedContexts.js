/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import globals from './globals';
import { Guid } from './Guid';

const path = require('path');

export const boundedContextBoilerplateType = 'boundedContext';

/**
 * Creates a dolittle bounded context based on the boilerplates provided in your .dolittle folder in your user's root directory
 *
 * @param {{name: string, applicationId: string}} context The template context
 * @param {string} language The core language of the bounded context
 * @param {string} destinationPath The absolute path of the destination of the bounded context
 */
export function createBoundedContext(context, language, destinationPath) {
    this._logger.info(`Creating bounded context with name '${context.name}'`);
    
    let boilerPlate = globals.boilerPlatesManager.boilerPlatesByLanguageAndType(language, boundedContextBoilerplateType)[0];
    
    if (boilerPlate === undefined) {
        globals.logger.error(`No boilerplate found with language '${language}' and type '${boundedContextBoilerplateType}'`);
        throw 'Missing boilerplate';
    }
    context.id = Guid.create();

    const boundedContextPath = path.join(destinationPath, context.name);
    
    globals.folders.makeFolderIfNotExists(boundedContextPath);

    globals.boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, context);
}
