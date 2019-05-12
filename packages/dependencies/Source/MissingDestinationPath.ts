/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class MissingDestinationPath extends Error {
    constructor(...args: any[]) {
        super(...args);
        Error.captureStackTrace(this, MissingDestinationPath);
    }

    static get new() {
        return new MissingDestinationPath('Missing destination path');
    } 
}