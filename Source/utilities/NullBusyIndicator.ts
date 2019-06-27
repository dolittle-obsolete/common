/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from "./index";

/**
 * Represents a null-implementation of {IBusyIndicator}.
 *
 * @export
 * @class NullBusyIndicator
 * @implements {IBusyIndicator}
 */
export class NullBusyIndicator implements IBusyIndicator {

    text = ''
   
    readonly isBusy = false;

    createNew(text?: string) { return this; }

    start(text?: string)  { return this; }

    stop() { return this; }
    
    stopAndPersist(text?: string)  { return this; }

    succeed(text?: string)  { return this; }

    fail(text?: string)  { return this; }

    info(text?: string)  { return this; }

    warn(text?: string)  { return this; }
}