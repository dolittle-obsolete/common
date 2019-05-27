/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * The exception that gets throw when an application configuration was expected but not found
 *
 * @export
 * @class ApplicationConfigurationNotFound
 * @extends {Error}
 */
export class ApplicationConfigurationNotFound extends Error {
    
    /**
     * Instantiates an instance of {ApplicationConfigurationNotFound}.
     * @param {...any[]} args
     */
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, ApplicationConfigurationNotFound);
    }

    static get new() {
        return new ApplicationConfigurationNotFound('Could not find application configuration');
    } 
}
