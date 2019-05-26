/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Boilerplate, NonArtifactsBoilerplate, ICanManageBoilerplates, IBoilerplateManagers } from './internal';

/**
 * Represents the manager of boiler plates
 */
export class BoilerplateManagers implements IBoilerplateManagers {
    /**
     * Creates an instance of BoilerplatesManager.
     * @param {IBoilerplatesLoader} boilerplatesLoader
 
     */
    constructor(managers: ICanManageBoilerplates[]) {
        this.managers = managers;
    } 
    readonly managers: ICanManageBoilerplates[];
    /**
     * @inheritdoc
     */
    get boilerplates(): Boilerplate[] {
        let boilerplates: Boilerplate[] = [];
        this.managers.forEach(_ => boilerplates.push(..._.boilerplates));
        return boilerplates;
    }
    
    addManagers(...managers: ICanManageBoilerplates[]): void {
        this.managers.push(...managers);
    }
    /**
     * @inheritdoc
     */
    boilerplatesByLanguage(language: string, namespace?: string): Boilerplate[] {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language === language;
            return _.language === language
        });
    }
    /**
     * @inheritdoc
     */
    boilerplatesByType(type: string, namespace?: string): Boilerplate[] {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.type === type;
            return _.type === type;
        });
    }

    /**
     * @inheritdoc
     */
    boilerplatesByLanguageAndType(language: string, type: string, namespace?: string): Boilerplate[] {
        return this.boilerplates.filter(_ => {
            if (_.namespace) return _.namespace === namespace && _.language == language && _.type == type;
            return _.language == language && _.type == type;
        });
    }

    /**
     * @inheritdoc
 
     */
    getAdornments(parentType: string, parentLanguage?: string, parentName?: string, namespace?: string): NonArtifactsBoilerplate[] {
        let boilerplates: NonArtifactsBoilerplate[] = [];
        this.boilerplates.forEach(_ => {
            if (_ instanceof NonArtifactsBoilerplate)
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
 
     */
    getAdornmentsForBoilerplate(boilerplate: Boilerplate, namespace?: string): NonArtifactsBoilerplate[] {
        return this.getAdornments(boilerplate.type, boilerplate.language, boilerplate.name, namespace);
    }
}