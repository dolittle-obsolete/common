/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from "./index";

/**
 * Represents a null-implementation of {ICanOutputMessages}
 *
 * @export
 * @class NullMessageOutputter
 * @implements {ICanOutputMessages}
 */
export class NullMessageOutputter implements ICanOutputMessages {
    
    print(...args: string[]) {}
    
    warn(...args: string[]) {}
    
    error(...args: string[]) {}

    table(data: any[][]) {}
}
