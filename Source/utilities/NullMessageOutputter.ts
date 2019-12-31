/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from './internal';

/**
 * Represents a null-implementation of {ICanOutputMessages}
 *
 * @export
 * @class NullMessageOutputter
 * @implements {ICanOutputMessages}
 */
export class NullMessageOutputter implements ICanOutputMessages {

    // tslint:disable-next-line: no-empty
    print(...args: string[]) {}

    // tslint:disable-next-line: no-empty
    warn(...args: string[]) {}

    // tslint:disable-next-line: no-empty
    error(...args: string[]) {}

    // tslint:disable-next-line: no-empty
    table(data: any[][]) {}
}
