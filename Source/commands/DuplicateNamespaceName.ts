/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Exception } from "@dolittle/tooling.common.utilities";

/**
 * The exception that gets thrown when there are multiple namespaces with the same name
 *
 * @export
 * @class DuplicateNamespaceName
 * @extends {Exception}
 */
export class DuplicateNamespaceName extends Exception {

    /**
     * Instantiates an instance of {DuplicateNamespaceName}.
     * @param {string} namespaceName
     */
    constructor(namespaceName: string) {
        super(`Found multiple namespaces with the name '${namespaceName}'`);
    }
}