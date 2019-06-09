/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_valid_configuration_for_discover_dependency {
    
    constructor() {
        this.name = 'name';
        this.description = 'description';
        this.discoverType = 'namespace';
        this.withNamespace = undefined;
        this.milestone = new RegExp('milestone');
        this.fileMatch = undefined;
        this.contentMatch = undefined;
        this.fromArea = undefined;
    }
}