/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders, FileSystem } from '@dolittle/tooling.common.files';
import { Logger } from '@dolittle/tooling.common.logging';
import path from 'path';
import { Handlebars, IContentBoilerplates, IBoilerplates, IContentBoilerplate, boilerplateIsContentBoilerplate} from '../index';

/**
 * Represents an implementation of {IContentBoilerplates}
 */
export class ContentBoilerplates implements IContentBoilerplates {

    /**
     * Instantiates an instance of {ContentBoilerplates}.
     * @param {IBoilerplates} _boilerplates
     * @param {Folders} _folders
     * @param {FileSystem} _fileSystem
     * @param {Logger} _logger
     * @param {Handlebars} _handlebars
     */
    constructor(private _boilerplates: IBoilerplates, private _folders: Folders, private _fileSystem: FileSystem, private _logger: Logger, private _handlebars: Handlebars) {}
    
    get boilerplates() {
        return this._boilerplates.boilerplates.filter(boilerplateIsContentBoilerplate);
    }

    byLanguage(language: string, namespace?: string) {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language === language;
            return _.language === language
        });
    }

    byType(type: string, namespace?: string) {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.type === type;
            return _.type === type;
        });
    }

    byLanguageAndType(language: string, type: string, namespace?: string) {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language == language && _.type == type;
            return _.language == language && _.type == type;
        });
    }

    adornmentsFor(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string) {
        let boilerplates = this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && (_.parent && _.parent.type === parentType)
            return _.parent && _.parent.type === parentType;
        });
        if (parentLanguage) boilerplates = boilerplates.filter(_ => {
            if (_.parent.language) return _.parent.language === parentLanguage;
            return true;
        });
        if (parentName) boilerplates = boilerplates.filter(_ => {
            if (_.parent.name) return _.parent.name === parentName;
            return true;
        });

        return boilerplates;
    }

    adornmentsForBoilerplate(boilerplate: IContentBoilerplate, namespace?: string) {
        return this.adornmentsFor(boilerplate.type, boilerplate.language, boilerplate.name, namespace);
    }

    create(boilerplate: IContentBoilerplate, destination: string, context: object) {
        this._logger.info(`Creating boilerplate with name '${boilerplate.name}' at destination '${destination}'`);
        this._folders.makeFolderIfNotExists(destination);
        this._folders.copy(destination, boilerplate.contentDirectory);
        boilerplate.pathsNeedingBinding.forEach(_ => {
            let pathToRename = path.join(destination, _);
            let segments: string[]  = [];
            pathToRename.split(/(\\|\/)/).forEach(segment => segments.push(this._handlebars.compile(segment)(context)));
            let result = segments.join('');
            this._fileSystem.renameSync(pathToRename, result);
        });
        
        boilerplate.filesNeedingBinding.forEach(_ => {
            let file = path.join(destination, _);
            let content = this._fileSystem.readFileSync(file, 'utf8');
            let template = this._handlebars.compile(content);
            let result = template(context);
            this._fileSystem.writeFileSync(file, result);
        });

        this._logger.info(`Boilerplate created`);
        return {boilerplate, destination};
    }
}