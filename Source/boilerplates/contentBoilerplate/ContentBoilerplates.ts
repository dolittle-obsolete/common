/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IFolders, IFileSystem } from '@dolittle/tooling.common.files';
import { ILoggers } from '@dolittle/tooling.common.logging';
import path from 'path';
import { Handlebars, IContentBoilerplates, IContentBoilerplate, boilerplateIsContentBoilerplate, Boilerplates, IBoilerplatesLoader } from '../internal';

/**
 * Represents an implementation of {IContentBoilerplates}
 */
export class ContentBoilerplates extends Boilerplates implements IContentBoilerplates {

    /**
     * Instantiates an instance of {ContentBoilerplates}.
     * @param {IBoilerplatesLoader} boilerplatesLoader
     * @param {IFolders} _folders
     * @param {IFileSystem} _fileSystem
     * @param {ILoggers} _logger
     * @param {Handlebars} _handlebars
     */
    constructor(boilerplatesLoader: IBoilerplatesLoader, private _folders: IFolders, private _fileSystem: IFileSystem, private _logger: ILoggers, private _handlebars: Handlebars) {
        super(boilerplatesLoader);
    }

    get boilerplates() {
        return super.boilerplates.filter(boilerplateIsContentBoilerplate);
    }

    byNamespace(namespace: string | undefined) {
        return super.byNamespace(namespace) as IContentBoilerplate[];
    }

    byLanguage(language: string, namespace?: string) {
        return super.byLanguage(language, namespace) as IContentBoilerplate[];
    }

    byType(type: string, namespace?: string) {
        return super.byType(type, namespace) as IContentBoilerplate[];
    }

    byLanguageAndType(language: string, type: string, namespace?: string)  {
        return super.byLanguageAndType(language, type, namespace) as IContentBoilerplate[];
    }

    adornmentsFor(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string) {
        let boilerplates = (this.byNamespace(namespace) as IContentBoilerplate[]).filter(_ => {
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

    async create(boilerplate: IContentBoilerplate, destination: string, context: object) {
        this._logger.info(`Creating boilerplate with name '${boilerplate.name}' at destination '${destination}'`);
        await this._folders.makeFolderIfNotExists(destination);
        await this._folders.copy(destination, boilerplate.contentDirectory);

        const tasks: Promise<void>[] = [];
        boilerplate.pathsNeedingBinding.forEach(_ => {
            const pathToRename = path.join(destination, _);
            const segments: string[]  = [];
            pathToRename.split(/(\\|\/)/).forEach(segment => segments.push(this._handlebars.compile(segment)(context)));
            const result = segments.join('');
            tasks.push(this._fileSystem.rename(pathToRename, result));
        });

        tasks.push(...boilerplate.filesNeedingBinding.map(async _ => {
            const file = path.join(destination, _);
            const content = await this._fileSystem.readFile(file, 'utf8');
            const template = this._handlebars.compile(content);
            const result = template(context);
            await this._fileSystem.writeFile(file, result);
        }));
        await Promise.all(tasks);
        this._logger.info('Boilerplate created');
        return {boilerplate, destination};
    }
}
