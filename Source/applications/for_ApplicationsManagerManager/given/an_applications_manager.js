import { ApplicationsManager } from "../../ApplicationsManager";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class an_applications_manager {
    constructor() {
        this.boiler_plates_manager = {
            boilerPlatesByLanguageAndType: sinon.stub(),
            createInstance: sinon.stub()
        };
        this.file_system = {
            readFileSync: sinon.stub(),
            existsSync: sinon.stub()  
        };

        this.applications_manager = new ApplicationsManager(this.boiler_plates_manager, this.file_system, logger);
    }
 }