/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from '@dolittle/tooling.common.utilities';

/**
 * The exception that gets throw when there are multiple dependencies with the same name
 *
 * @export
 * @class DuplicateDependencies
 * @extends {Exception}
 */
export class DuplicateDependencies extends Exception {

    /**
     * Instantiates an instance of {DuplicateDependencies}.
     */
    constructor(dependencyName: string) {
        super(`There are multiple dependencies with the name '${dependencyName}'`);
    }
}
