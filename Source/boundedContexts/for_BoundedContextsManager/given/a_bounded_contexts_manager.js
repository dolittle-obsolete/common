import { BoundedContextsManager } from "../../BoundedContextsManager";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_bounded_contexts_manager {
    constructor() {
        this.boiler_plates_manager = {
            boilerPlatesByLanguageAndType: sinon.stub(),
            createInstance: sinon.stub()
        };

        this.bounded_contexts_manager = new BoundedContextsManager(this.boiler_plates_manager, logger);
    }
 }