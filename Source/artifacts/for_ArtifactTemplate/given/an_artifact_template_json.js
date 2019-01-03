/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 export class an_artifact_template_json{
    constructor() {
        this.path = 'some path'; 
        this.artifact_template_json = {
            name: 'Aggregate Root template', 
            type: 'aggregateRoot', 
            area: 'domain', 
            description: 'Creates an Aggregate Root', 
            language: 'csharp', 
            includedFiles: [
                '{{name}}.cs'
            ]
        }; 
    }
 }