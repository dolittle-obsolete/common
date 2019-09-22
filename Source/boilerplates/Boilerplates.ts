/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBoilerplatesLoader, IBoilerplates} from './internal';

/**
 * Represents an implementation of {IBoilerplates}
 */
export class Boilerplates implements IBoilerplates {

    /**
     * Instantiates an instance of {Boilerplates}.
     * @param {IBoilerplatesLoader} _boilerplatesLoader
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
            return _.language === language || _.language === 'any'
        });
    }

    byType(type: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            return _.type === type || _.type === 'any';
        });
    }

    byLanguageAndType(language: string, type: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            this.byLanguage(language, namespace) && this.byType(type, namespace);
        });
    }
}