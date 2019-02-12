/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 export class an_artifact_template_json_with_dependencies{
    constructor() {
        this.path = 'some path';
        this.dependency_object = {
            description: 'The type of the Concept',
            name: 'conceptType',
            type: 'userInput',
            userInputType: 'input',
            promptMessage: 'Concept as (Concept Type)'
        };
        this.artifact_template_json = {
            name: 'Aggregate Root template', 
            type: 'aggregateRoot', 
            area: 'domain', 
            description: 'Creates an Aggregate Root', 
            language: 'csharp', 
            includedFiles: [
                '{{name}}.cs'
            ],
            dependencies: [
                this.dependency_object
            ]
        }; 
    }
 }