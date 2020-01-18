/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets thrown when there are multiple parsers found for a boilerplate
 *
 * @export
 * @class MultipleParsersForBoilerplate
 * @extends {Exception}
 */
export class MultipleParsersForBoilerplate extends Exception {

    /**
     * Instantiates an instance of {MultipleParsersForBoilerplate}.
     * @param {string} boilerplatePath
     */
    constructor(boilerplatePath: string) {
        super(`Found multiple parsers for boilerplate from path ${boilerplatePath}`);
    }
}
