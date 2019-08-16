/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency, PromptDependency, argumentUserInputType } from '@dolittle/tooling.common.dependencies';
import { Boilerplate, Scripts, ITemplate, templatesBoilerplateType, ITemplatesBoilerplate } from '../index';

/**
 * Represents an implementation of {ITemplatesBoilerplate}
 */
export class TemplatesBoilerplate extends Boilerplate implements ITemplatesBoilerplate {
    /**
     * Instantiates a new instance of {TemplatesBoilerplate}
     * @param {string} language 
     * @param {string} name 
     * @param {string} description 
     * @param {IDependency[]} dependencies
     * @param {string} namespace
     * @param {Scripts} scripts
     * @param {string} path
     */
    constructor(language: string, name: string, description: string, dependencies: IDependency[], namespace: string, scripts: Scripts, contentDirectory: string, private _templates: ITemplate[]) {
        super(language, name, description, templatesBoilerplateType, dependencies, namespace, scripts, contentDirectory);
    }
    
    readonly nameDependency = new PromptDependency(
        'name',
        'The name of the template to be created',
        argumentUserInputType,
        'The name of the template to be created'
    );

    get templates() { return this._templates; }

    templatesByType(type: string) {
        return this.templates.filter(_ => _.type === type);
    }
}
