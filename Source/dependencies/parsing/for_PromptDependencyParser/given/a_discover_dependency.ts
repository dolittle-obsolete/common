/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DiscoverDependency } from "../../../internal";

export class a_discover_dependency {
    dependency: DiscoverDependency;
    constructor() {
        this.dependency = new DiscoverDependency('name', 'desc', [],  'namespace', undefined, 'something');
    }
}
    