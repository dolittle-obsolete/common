/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets thrown when there are multiple instances of {ICanParseBoilerplates} that can parse a given boilerplate
 *
 * @export
 * @class CannotParseBoilerplate
 * @extends {Exception}
 */
export class CannotParseBoilerplate extends Exception {

    /**
     * Instantiates an instance of {CannotParseBoilerplate}.
     * @param {string} boilerplatePath
     */
    constructor(boilerplatePath: string) {
        super(`Cannot parse boilerplate from path '${boilerplatePath}'`);
    }
}
