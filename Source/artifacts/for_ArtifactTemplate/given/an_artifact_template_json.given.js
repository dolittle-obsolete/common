/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoilerPlate } from "../../../boilerPlates/BoilerPlate";


 export class an_artifact_template_json{
    constructor() {
        
        this.included_files = ['{{name}}.cs']
        this.path = 'some path';
        this.boilerplate = new BoilerPlate('language', 'name', 'desc', 'type', [], 'target', 'framework', {}, 'path', [], []);
        this.artifact_template_json = {
            name: 'Aggregate Root template', 
            type: 'aggregateRoot', 
            area: 'domain', 
            description: 'Creates an Aggregate Root', 
        }; 
    }
 }