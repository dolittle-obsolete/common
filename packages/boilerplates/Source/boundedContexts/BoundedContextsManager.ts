/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoundedContext, boundedContextFileName, Core, InteractionLayer, Resources } from '@dolittle/tooling.common.configurations';
import { Dependency } from '@dolittle/tooling.common.dependencies';
import { Folders } from '@dolittle/tooling.common.utilities/Folders';
import { getFileDirPath, groupBy } from '@dolittle/tooling.common.utilities/helpers';
import * as FsExtra from 'fs-extra';
import path from 'path';
import { Logger } from 'winston';
import { IApplicationsManager } from '../applications/IApplicationsManager';
import { Boilerplate } from '../Boilerplate';
import { ExpectedBoilerplateError } from '../ExpectedBoilerplateError';
import { IBoilerplatesCreator } from '../IBoilerplatesCreator';
import { ICanManageBoilerplates } from '../ICanManageBoilerplates';
import { ApplicationConfigurationNotFound } from './ApplicationConfigurationNotFound';
import { CreatedBoundedContextDetails } from './CreatedBoundedContextDetails';
import { IBoundedContextsManager } from './IBoundedContextsManager';


export const boundedContextBoilerplateType = 'boundedContext';

const boundedContextAdornmentDependencyName = 'boundedContextAdornment'
/**
 * 
 *
 * @export
 * @class BoundedContextsManager
 */
export class BoundedContextsManager implements IBoundedContextsManager {
    private _boilerplates: Boilerplate[]
    private _boilerplateManagers: ICanManageBoilerplates[];
    private _boilerplatesCreator: IBoilerplatesCreator;
    private _applicationsManager: IApplicationsManager;
    private _folders: Folders;
    private _filesystem: typeof FsExtra;
    private _logger: Logger;
    /**
     *Creates an instance of BoundedContextsManager.
     * @param {ICanManageBoilerplates} boilerplateManager
     * @param {IBoilerplatesCreator} boilerplatesCreator
     * @param {IApplicationsManager} applicationsManager
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     * @memberof BoundedContextsManager
     */
    constructor(boilerplateManagers: ICanManageBoilerplates[], boilerplatesCreator: IBoilerplatesCreator, applicationsManager: IApplicationsManager, folders: Folders, fileSystem: typeof FsExtra, logger: Logger) {
        this._boilerplateManagers = boilerplateManagers;
        this._boilerplatesCreator = boilerplatesCreator;
        this._applicationsManager = applicationsManager;
        this._folders = folders;
        this._logger = logger;
        this._filesystem = fileSystem;
        this._boilerplates = [];

        this.loadAllBoilerplates();
        
    }
    get boilerplates(): Boilerplate[] {
        this.loadAllBoilerplates();
        return this._boilerplates;
    }
    get hasBoilerplate(): boolean {
        let boilerplates = this.boilerplates;
        return boilerplates && boilerplates.length > 0;
    }
    /**
     * @inheritdoc
     */
    getNearestBoundedContextConfig(startPath: string): BoundedContext | null {
        let regex =  new RegExp('\\b'+boundedContextFileName+'\\b');
        const boundedContextConfigPath = this._folders.getNearestFileSearchingUpwards(startPath, regex);
        if (boundedContextConfigPath === undefined || boundedContextConfigPath === '') return null;
        this._logger.info(`Found bounded context configuration at path '${boundedContextConfigPath}'`);

        let boundedContextObj = JSON.parse(this._filesystem.readFileSync(boundedContextConfigPath, 'utf8'));
        let boundedContext = BoundedContext.fromJson(boundedContextObj, boundedContextConfigPath);
        
        return boundedContext;
    }
    /**
     * Check if a bounded context configuration can be found in the given directory.
     * @param {string} folder The directory path to search
     * @returns {boolean} Whether or not the bounded context configuration was found
     */
    hasBoundedContext(folder: string): boolean {
        const filePath = path.join(folder, boundedContextFileName);
        return this._filesystem.existsSync(filePath);
    }

    /**
     * Retrieves the boilerplate configurations for bounded context with the given language
     * @param {string} language 
     * @param {string} [namespace=undefined]
     * @return {Boilerplate[]} The bounded context {Boilerplate} with of the given language
     */
    boilerplatesByLanguage(language: string, namespace?: string): Boilerplate[] {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        })
    }
    /**
     * Gets the adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Boilerplate[]}
     * @memberof BoundedContextsManager
     */
    getAdornments(language?: string, boilerplateName?: string, namespace?: string): Boilerplate[] {
        let adornments: Boilerplate[] = [];
        this._boilerplateManagers.forEach(_ => {
            _.getAdornments(boundedContextBoilerplateType, language, boilerplateName, namespace).forEach(_ => {
                if (_ instanceof Boilerplate) adornments.push(_);
                else throw new ExpectedBoilerplateError(`Expected boilerplate of type '${Boilerplate.name}' but got a '${_.constructor.name}'`);
            });
        });
        return adornments.filter(_ => _.type === 'adornment');
    }
    /**
     * Gets the interaction adornment boilerplates for a bounded context based on language and boilerplate name
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Boilerplate[]}
     * @memberof BoundedContextsManager
     */
    getInteractionLayers(language?: string, boilerplateName?: string, namespace?: string): Boilerplate[] {
        let adornments: Boilerplate[] = [];
        this._boilerplateManagers.forEach(_ => {
            _.getAdornments(boundedContextBoilerplateType, language, boilerplateName, namespace).forEach(_ => {
                if (_ instanceof Boilerplate) adornments.push(_);
                else throw new ExpectedBoilerplateError(`Expected boilerplate of type '${Boilerplate.name}' but got a '${_.constructor.name}'`);
            });
        });
        return adornments.filter(_ => _.type === 'interaction');
     }
    /**
     * Create dependencies used for prompting the user for bounded context adornment
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Dependency[]}
     * @memberof BoundedContextsManager
     */
    createAdornmentDependencies(language?: string, boilerplateName?: string, namespace?: string): Dependency[] {
        let adornments = this.getAdornments(language, boilerplateName, namespace);
        if (adornments.length === 0) return [];
        let boundedContextAdornment = new Dependency(
            `Choose bounded context adornment`,
            `${boundedContextAdornmentDependencyName}`,
            'userInput',
            undefined,
            'chooseOne',
            adornments.map(_ => _.name).concat('None'),
            `Choose bounded context adornment`
        );

        return [boundedContextAdornment];
    }
    /**
     * Create dependencies used for prompting the user for interaction layers
     *
     * @param {string} [language=undefined] The language of the bounded context boilerplate
     * @param {string} [boilerplateName=undefined] The name of the boilerplate
     * @param {string} [namespace=undefined] The namespace of the boilerplate
     * @returns {Dependency[]}
     * @memberof BoundedContextsManager
     */
    createInteractionDependencies(language?: string, boilerplateName?: string, namespace?: string): Dependency[] {
        let interactionLayers = this.getInteractionLayers(language, boilerplateName, namespace);
        let interactionLayerTypes = groupBy('target')(interactionLayers);
        return Object.keys(interactionLayerTypes)
            .map(target => new Dependency(
                `Choose ${target} interaction layer`,
                `interaction${target}`,
                'userInput',
                undefined,
                'chooseOne',
                interactionLayers.map(_ => _.name).concat('None'),
                `Choose ${target} interaction layer`
            ));
    }
    /**
     * Creates a dolittle bounded context.
     * 
     * Interaction layers will be created as well if the dependencies are supplied in the context object.
     *
     * @param {any} context The template context
     * @param {Boilerplate} boilerplate The Bounded Context Boilerplate
     * @param {string} destinationPath The absolute path of the destination of the bounded context
     * @param {string} [namespace=undefined]
     * @returns {{boilerplate: Boilerplate, destination: string}[]} Returns the created boilerplates with destination
     */
    createBoundedContext(context: any, boilerplate: Boilerplate, destinationPath: string, namespace?: string): CreatedBoundedContextDetails[] {
        let application = this._applicationsManager.getApplicationFrom(destinationPath);
        if (!application) throw ApplicationConfigurationNotFound.new;
        context.applicationId = application.id;
        
        const boundedContextPath = path.join(destinationPath, context.name);
        const boundedContextConfigPath = path.join(boundedContextPath, boundedContextFileName);

        let createdBoilerplates = [{boilerplate, destination: boundedContextPath}];
        
        this._boilerplatesCreator.createBoilerplate(boilerplate, boundedContextPath, context);

        let boundedContextJson = this._filesystem.readJsonSync(boundedContextConfigPath);

        const hasAdornment = context[boundedContextAdornmentDependencyName] !== undefined;

        if (hasAdornment) {
            const adornmentBoilerplateName = context[boundedContextAdornmentDependencyName];
            let adornmentBoilerplate = this.getAdornments(boilerplate.language, boilerplate.name, namespace).find(_ => _.name === adornmentBoilerplateName);
            if (adornmentBoilerplate) {
                this._boilerplatesCreator.createBoilerplate(adornmentBoilerplate, boundedContextPath, context);
                createdBoilerplates.push({boilerplate: adornmentBoilerplate, destination: boundedContextPath});
            }
        }

        let interactionLayers: InteractionLayer[] = [];
        let interactionLayerChoices = Object.keys(context).filter(_ => _.startsWith('interaction'));

        if (interactionLayerChoices.length > 0) {
            let interactionLayerNames = interactionLayerChoices.map(prop => context[prop]);
            let interactionLayerBoilerplates = this.getInteractionLayers(boilerplate.language, boilerplate.name, namespace);
            interactionLayerBoilerplates = interactionLayerBoilerplates.filter(boilerplate => interactionLayerNames.includes(boilerplate.name));
            interactionLayerBoilerplates.forEach(boilerplate => {
                let entryPoint = `${boilerplate.target[0].toUpperCase()}${boilerplate.target.slice(1)}`;
                interactionLayers.push(
                    new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint)
                );
                this._boilerplatesCreator.createBoilerplate(boilerplate, path.join(boundedContextPath, entryPoint), context);
                createdBoilerplates.push({boilerplate, destination: boundedContextPath});
            });
        }
        let boundedContext = new BoundedContext(boundedContextJson.application, boundedContextJson.boundedContext, boundedContextJson.boundedContextName, 
            Resources.fromJson(boundedContextJson.resources), Core.fromJson(boundedContextJson.core), interactionLayers, boundedContextPath);

        this._filesystem.writeJsonSync(boundedContextConfigPath, boundedContext.toJson(), {spaces: 4});
        return createdBoilerplates;
    }
    /**
     * Creates an interaction layer and adds it to the bounded context by finding it in the folder.
     * 
     * Use addInteractionLayerToBoundedContext if you need to add multiple interaction layers
     *
     * @param {*} context
     * @param {Boilerplate} boilerplate
     * @param {string} boundedContextFolder
     * @param {string} entryPoint
     * @memberof BoundedContextsManager
     */
    addInteractionLayer(context: any , boilerplate: Boilerplate, boundedContextFolder: string, entryPoint: string) {
        let boundedContext = this.getNearestBoundedContextConfig(boundedContextFolder);
        if (!boundedContext) throw new Error('Could not discover the bounded context');
        this._boilerplatesCreator.createBoilerplate(boilerplate, path.join(getFileDirPath(boundedContext.path), entryPoint), context);
        boundedContext.addInteractionLayer(new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint));
        this._filesystem.writeJsonSync(boundedContext.path, boundedContext.toJson(), {spaces: 4});
    }
    /**
     * Creates an interaction layer, adds it to the bounded context and returns the bounded context object
     *
     * @param {*} context
     * @param {Boilerplate} boilerplate
     * @param {BoundedContext} boundedContext
     * @param {string} entryPoint
     * @returns {BoundedContext}
     * @memberof BoundedContextsManager
     */
    addInteractionLayerToBoundedContext(context: any, boilerplate: Boilerplate, boundedContext: BoundedContext, entryPoint: string): BoundedContext {
        this._boilerplatesCreator.createBoilerplate(boilerplate, path.join(getFileDirPath(boundedContext.path), entryPoint), context);
        boundedContext.addInteractionLayer(new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint));
        this._filesystem.writeJsonSync(boundedContext.path, boundedContext.toJson(), {spaces: 4});

        return boundedContext;
    }

    private loadAllBoilerplates()  {
        this._boilerplates = [];
        this._boilerplateManagers.forEach(_ => {
            _.boilerplatesByType(boundedContextBoilerplateType).forEach(_ => {
                if (_ instanceof Boilerplate) this._boilerplates.push(_);
                else throw new ExpectedBoilerplateError(`Expected boilerplate of type '${Boilerplate.name}' but got a '${_.constructor.name}'`)
            });
        });
    }
    
}