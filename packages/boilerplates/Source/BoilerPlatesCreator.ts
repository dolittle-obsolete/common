/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Folders } from '@dolittle/tooling.common.utilities';
import * as FsExtra from 'fs-extra';
import * as Handlebars from 'handlebars';
import path from 'path';
import { Logger } from 'winston';
import { Boilerplate } from './Boilerplate';
import { IBoilerplatesCreator } from './IBoilerplatesCreator';

/**
 * Represents the manager of boiler plates
 */
export class BoilerplatesCreator implements IBoilerplatesCreator {
    private _folders: Folders;
    private _fileSystem: typeof FsExtra;
    private _logger: Logger;
    private _handlebars: typeof Handlebars;

    /**
     * Initializes a new instance of {BoilerplatesManager}
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     * @param {typeof Handlebars} handlebars
     */
    constructor(folders: Folders, fileSystem: typeof FsExtra, logger: Logger, handlebars: typeof Handlebars) {
        this._folders = folders;
        this._fileSystem = fileSystem;
        this._logger = logger;
        this._handlebars = handlebars;
    }
    /**
     * @inheritdoc
     */
    createBoilerplate(boilerplate: Boilerplate, destination: string, context: object) {
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
    }
}