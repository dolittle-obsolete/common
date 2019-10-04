/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ValidatorsFor, IDependency } from "../../../internal";

export class no_validators extends ValidatorsFor<IDependency> {
    constructor() {
        super([]);
    }
} 