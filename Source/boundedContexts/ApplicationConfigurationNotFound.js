/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
export class ApplicationConfigurationNotFound extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, ApplicationConfigurationNotFound);
    }

    static get new() {
        return new ApplicationConfigurationNotFound('Could not find application configuration');
    } 
}
