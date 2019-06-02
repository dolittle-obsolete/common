/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependency } from '@dolittle/tooling.common.dependencies';
import { getFileDirPath, getFileNameAndExtension } from '@dolittle/tooling.common.files';
import { Template, Boilerplate, Scripts, templatesBoilerplateContentDirectoryName, ITemplate, templatesBoilerplateType, ITemplatesBoilerplate } from '../index';

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

    readonly contentDirectoryName = templatesBoilerplateContentDirectoryName;
    
    /**
     * Gets the templates belonging under this boilerplate
     * @readonly
     */
    get templates() { return this._templates; }

    /**
     * Gets the templates with the given type
     *
     * @param {string} type The type of the {Template}
     */
    templatesByType(type: string) {
        return this.templates.filter(_ => _.type === type);
    }

}

