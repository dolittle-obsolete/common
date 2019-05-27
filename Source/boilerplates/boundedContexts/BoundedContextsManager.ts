/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoundedContext, boundedContextFileName, Core, InteractionLayer, Resources } from '@dolittle/tooling.common.configurations';
import { PromptDependency, chooseOneUserInputType } from '@dolittle/tooling.common.dependencies';
import { Folders, getFileDirPath, groupBy } from '@dolittle/tooling.common.utilities';
import * as FsExtra from 'fs-extra';
import path from 'path';
import { Logger } from 'winston';
import { IApplicationsManager, NonArtifactsBoilerplate, WrongBoilerplateType, ApplicationConfigurationNotFound, 
    CreatedBoundedContextDetails, IBoundedContextsManager, IBoilerplates } from '../index';


export const boundedContextBoilerplateType = 'boundedContext';

const boundedContextAdornmentDependencyName = 'boundedContextAdornment'
/**
 * 
 *
 * @export
 * @class BoundedContextsManager
 */
export class BoundedContextsManager implements IBoundedContextsManager {
    private _loadedBoilerplates: NonArtifactsBoilerplate[]

    /**
     *Creates an instance of BoundedContextsManager.
     * @param {IBoilerplateManagers} boilerplateManager
     * @param {IBoilerplatesCreator} boilerplatesCreator
     * @param {IApplicationsManager} applicationsManager
     * @param {Folders} folders
     * @param {typeof FsExtra} fileSystem
     * @param {Logger} logger
     */
    constructor(private _boilerplates: IBoilerplates, private _applicationsManager: IApplicationsManager,
        private _folders: Folders, private _filesystem: typeof FsExtra, private _logger: Logger) {
        this._loadedBoilerplates = [];
    }
    
    get boilerplates() {
        this.loadAllBoilerplates();
        return this._loadedBoilerplates;
    }

    getNearestBoundedContextConfig(startPath: string) {
        let regex =  new RegExp('\\b'+boundedContextFileName+'\\b');
        const boundedContextConfigPath = this._folders.getNearestFileSearchingUpwards(startPath, regex);
        if (boundedContextConfigPath === undefined || boundedContextConfigPath === '') return null;
        this._logger.info(`Found bounded context configuration at path '${boundedContextConfigPath}'`);

        let boundedContextObj = JSON.parse(this._filesystem.readFileSync(boundedContextConfigPath, 'utf8'));
        let boundedContext = BoundedContext.fromJson(boundedContextObj, boundedContextConfigPath);
        
        return boundedContext;
    }

    hasBoundedContext(folder: string) {
        const filePath = path.join(folder, boundedContextFileName);
        return this._filesystem.existsSync(filePath);
    }

    boilerplatesByLanguage(language: string, namespace?: string) {
        let boilerplates = this.boilerplates;
        return boilerplates.filter( _ => {
            if (namespace && _.namespace) return _.namespace === namespace && _.language === language;
            return _.language && language; 
        })
    }

    getAdornments(language?: string, boilerplateName?: string, namespace?: string) {
        let adornments: NonArtifactsBoilerplate[] = this._boilerplates.adornmentsFor(boundedContextBoilerplateType, language, boilerplateName, namespace)
            .map(_ => {
                if (_ instanceof NonArtifactsBoilerplate) return _;
                else throw new WrongBoilerplateType(`Expected boilerplate of type '${NonArtifactsBoilerplate.name}' but got a '${(<any>_).constructor.name}'`);
            });
        return adornments.filter(_ => _.type === 'adornment');
    }
    
    getInteractionLayers(language?: string, boilerplateName?: string, namespace?: string) {
        let adornments: NonArtifactsBoilerplate[] = this._boilerplates.adornmentsFor(boundedContextBoilerplateType, language, boilerplateName, namespace)
            .map(_ => {
                if (_ instanceof NonArtifactsBoilerplate) return _;
                else throw new WrongBoilerplateType(`Expected boilerplate of type '${NonArtifactsBoilerplate.name}' but got a '${(<any>_).constructor.name}'`);
            });
        return adornments.filter(_ => _.type === 'interaction');
     }
    
    createAdornmentDependencies(language?: string, boilerplateName?: string, namespace?: string) {
        let adornments = this.getAdornments(language, boilerplateName, namespace);
        if (adornments.length === 0) return [];
        let boundedContextAdornment = new PromptDependency(
            `${boundedContextAdornmentDependencyName}`,
            `Choose bounded context adornment`,
            chooseOneUserInputType,
            `Choose bounded context adornment`,
            adornments.map(_ => _.name).concat('None')
        );

        return [boundedContextAdornment];
    }
    
    createInteractionDependencies(language?: string, boilerplateName?: string, namespace?: string) {
        let interactionLayers = this.getInteractionLayers(language, boilerplateName, namespace);
        let interactionLayerTypes = groupBy('target')(interactionLayers);
        return Object.keys(interactionLayerTypes)
            .map(target => new PromptDependency(
                `interaction${target}`,
                `Choose ${target} interaction layer`,
                chooseOneUserInputType,
                `Choose ${target} interaction layer`,
                interactionLayers.map(_ => _.name).concat('None')
            ));
    }

    create(context: any, boilerplate: NonArtifactsBoilerplate, destinationPath: string, namespace?: string) {
        let application = this._applicationsManager.getApplicationFrom(destinationPath);
        if (!application) throw ApplicationConfigurationNotFound.new;
        context.applicationId = application.id;
        
        const boundedContextPath = path.join(destinationPath, context.name);
        const boundedContextConfigPath = path.join(boundedContextPath, boundedContextFileName);

        let createdBoilerplates = [{boilerplate, destination: boundedContextPath}];
        
        this._boilerplates.create(boilerplate, boundedContextPath, context);

        let boundedContextJson = this._filesystem.readJsonSync(boundedContextConfigPath);

        const hasAdornment = context[boundedContextAdornmentDependencyName] !== undefined;

        if (hasAdornment) {
            const adornmentBoilerplateName = context[boundedContextAdornmentDependencyName];
            let adornmentBoilerplate = this.getAdornments(boilerplate.language, boilerplate.name, namespace).find(_ => _.name === adornmentBoilerplateName);
            if (adornmentBoilerplate) {
                this._boilerplates.create(adornmentBoilerplate, boundedContextPath, context);
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
                this._boilerplates.create(boilerplate, path.join(boundedContextPath, entryPoint), context);
                createdBoilerplates.push({boilerplate, destination: boundedContextPath});
            });
        }
        let boundedContext = new BoundedContext(boundedContextJson.application, boundedContextJson.boundedContext, boundedContextJson.boundedContextName, 
            Resources.fromJson(boundedContextJson.resources), Core.fromJson(boundedContextJson.core), interactionLayers, boundedContextPath);

        this._filesystem.writeJsonSync(boundedContextConfigPath, boundedContext.toJson(), {spaces: 4});
        return createdBoilerplates;
    }

    addInteractionLayer(context: any , boilerplate: NonArtifactsBoilerplate, boundedContextFolder: string, entryPoint: string) {
        let boundedContext = this.getNearestBoundedContextConfig(boundedContextFolder);
        if (!boundedContext) throw new Error('Could not discover the bounded context');
        this._boilerplates.create(boilerplate, path.join(getFileDirPath(boundedContext.path), entryPoint), context);
        boundedContext.addInteractionLayer(new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint));
        this._filesystem.writeJsonSync(boundedContext.path, boundedContext.toJson(), {spaces: 4});
    }
    
    addInteractionLayerToBoundedContext(context: any, boilerplate: NonArtifactsBoilerplate, boundedContext: BoundedContext, entryPoint: string): BoundedContext {
        this._boilerplates.create(boilerplate, path.join(getFileDirPath(boundedContext.path), entryPoint), context);
        boundedContext.addInteractionLayer(new InteractionLayer(boilerplate.type, boilerplate.language, boilerplate.framework, entryPoint));
        this._filesystem.writeJsonSync(boundedContext.path, boundedContext.toJson(), {spaces: 4});

        return boundedContext;
    }

    private loadAllBoilerplates()  {
        this._loadedBoilerplates = this._boilerplates.byType(boundedContextBoilerplateType).map(_ => {
            if (_ instanceof NonArtifactsBoilerplate) return _;
            else throw new WrongBoilerplateType(`Expected boilerplate of type '${NonArtifactsBoilerplate.name}' but got a '${_.constructor.name}'`)
        });
    }
    
}