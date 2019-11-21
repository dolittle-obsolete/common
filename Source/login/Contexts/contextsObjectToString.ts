/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ContextsObject } from '../internal';

/**
 * Represents the {ContextsObject} as a string
 *
 * @export
 * @param {ContextsObject} contexts
 * @returns
 */
export function contextsObjectToString(contexts: ContextsObject) {
    let contextsAndNames = Object.keys(contexts).map(_ => {
        return {contextName: _, context: contexts[_]};
    });
    return contextsAndNames.length === 0? 'No context to show' : contextsAndNames.map(_ => `${_.contextName}:\n${JSON.stringify(_.context, undefined, 4)}`)
                            .join('\n');
}
