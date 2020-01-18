/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBoilerplatesLoader, IBoilerplates, IBoilerplate } from './internal';

const anyType = 'any';
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
            return this.matchesLanguage(_, language);
        });
    }

    byType(type: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            return this.matchesType(_, type);
        });
    }

    byLanguageAndType(language: string, type: string, namespace?: string) {
        return this.byNamespace(namespace).filter(_ => {
            return this.matchesLanguage(_, language) && this.matchesType(_, type);
        });
    }

    private matchesType(boilerplate: IBoilerplate, type: string) {
        return boilerplate.type === type || boilerplate.type === anyType;
    }

    private matchesLanguage(boilerplate: IBoilerplate, language: string) {
        return boilerplate.language === language || boilerplate.language === anyType;
    }
}
