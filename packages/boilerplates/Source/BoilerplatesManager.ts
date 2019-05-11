/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BaseBoilerplate } from './BaseBoilerplate';
import { Boilerplate } from './Boilerplate';
import { IBoilerplatesLoader } from './IBoilerplatesLoader';
import { ICanManageBoilerplates } from './ICanManageBoilerplates';

/**
 * Represents the manager of boiler plates
 */
export class BoilerplatesManager implements ICanManageBoilerplates {
    private _boilerplatesLoader: IBoilerplatesLoader;
    /**
     * Creates an instance of BoilerplatesManager.
     * @param {IBoilerplatesLoader} boilerplatesLoader
     * @memberof BoilerplatesManager
     */
    constructor(boilerplatesLoader: IBoilerplatesLoader) {
        this._boilerplatesLoader = boilerplatesLoader;
    } 
    /**
     * @inheritdoc
     */
    get boilerplates(): BaseBoilerplate[] {
        return this._boilerplatesLoader.loadedBoilerplates;
    }
    /**
     * @inheritdoc
     */
    get hasBoilerplates(): boolean {
        return this.boilerplates && this.boilerplates.length > 0;
    }
    /**
     * @inheritdoc
     */
    boilerplatesByLanguage(language: string, namespace?: string): BaseBoilerplate[] {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language === language;
            return _.language === language
        });
    }
    /**
     * @inheritdoc
     */
    boilerplatesByType(type: string, namespace?: string): BaseBoilerplate[] {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.type === type;
            return _.type === type;
        });
    }

    /**
     * @inheritdoc
     */
    boilerplatesByLanguageAndType(language: string, type: string, namespace?: string): BaseBoilerplate[] {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language == language && _.type == type;
            return _.language == language && _.type == type;
        });
    }

    /**
     * @inheritdoc
     * @memberof BoilerplatesManager
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): Boilerplate[] {
        let boilerplates: Boilerplate[] = [];
        this.boilerplates.forEach(_ => {
            if (_ instanceof Boilerplate)
                boilerplates.push(_);
        });
        
        boilerplates =  boilerplates.filter(_ => {
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
    /**
     * @inheritdoc
     *
     * @memberof BoilerplatesManager
     */
    getAdornmentsForBoilerplate(boilerplate: BaseBoilerplate, namespace?: string): Boilerplate[] {
        return this.getAdornments(boilerplate.type, boilerplate.language, boilerplate.name, namespace);
    }
}