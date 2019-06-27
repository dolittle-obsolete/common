/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBoilerplatesLoader, IBoilerplates} from './index';

/**
 * Represents an implementation of {IBoilerplates}
 */
export class Boilerplates implements IBoilerplates {

    /**
     * Instantiates an instance of {Boilerplates}.
     * @param {IBoilerplatesLoader} _boilerplatesLoader
     * @param {Folders} _folders
     * @param {FileSystem} _fileSystem
     * @param {Logger} _logger
     * @param {typeof Handlebars} _handlebars
     */
    constructor(private _boilerplatesLoader: IBoilerplatesLoader) {}
    
    get boilerplates() {
        return this._boilerplatesLoader.loaded;
    }

    byNamespace(namespace: string | undefined) {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace;
            return true;
        });
    }

    byLanguage(language: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language === language;
            return _.language === language
        });
    }

    byType(type: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.type === type;
            return _.type === type;
        });
    }

    byLanguageAndType(language: string, type: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language == language && _.type == type;
            return _.language == language && _.type == type;
        });
    }
}