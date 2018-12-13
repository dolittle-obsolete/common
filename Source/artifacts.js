/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import globals from './globals';
import { getFileDirPath } from './helpers';
import { ArtifactTemplate, artifactTemplateFromJson } from './artifacts/ArtifactTemplate';
import { BoilerPlate } from './boilerPlates/BoilerPlate';

export const artifactsBoilerplateType = 'artifacts';

/**
 * Retrieves the boilerplate.json configuration for artifacts with the given language
 * @param {string} language 
 * @return {BoilerPlate} The Boilerplate with of the given language
 */
export function boilerPlateByLanguage(language) {
    let boilerPlates = globals.boilerPlatesManager.boilerPlatesByLanguageAndType(language, artifactsBoilerplateType);
    if (boilerPlates === null || boilerPlates.length === 0) {
        this._logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${artifactsBoilerplateType}`);
        throw 'Could not find boilerplate for given language and type';
    }
    if (boilerPlates.length > 1) {
        this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${artifactsBoilerplateType}`);
        throw 'Found multiple boilerplates';
    }
    return boilerPlates[0];
}
/**
 * Gets the artifact template alongside with the location of where it was found based on the language and type of the artifact
 * @param {BoilerPlate} boilerPlate 
 * @param {string} artifactType
 * @returns {ArtifactTemplate}
 */
export function templateByBoilerplate(boilerPlate, artifactType)
{
    let templateFiles = globals.folders.searchRecursive(boilerPlate.location, 'template.json');
    let templates = [];
    templateFiles.forEach(_ => {
        let location = getFileDirPath(_);
        let template = artifactTemplateFromJson(JSON.parse(globals.fileSystem), location);
        if (template.language === boilerPlate.language && template.type === artifactType)
            templates.push(template);
    });

    if (templates.length === 0) {
        globals.logger.error(`Could not find any artifact templates with artifact type '${artifactType}' and language '${boilerPlate.language}'`);
        throw 'Artifact template not found';
    }
    if (templates.length > 1) {
        globals.logger.error(`Found multiple artifact templates with artifact type '${artifactType}' and language '${boilerPlate.language}'`);
        throw 'Multiple artifact templates found';
    }
    return templates[0];
}
/**
 * Creates an artifact of the given type at the given destination with the given name 
 * @param {any} context 
 * @param {string} language
 * @param {ArtifactTemplate} artifactTemplate
 * @param {string} destinationPath
 * 
 */
export function createArtifact(context, language, artifactTemplate, destinationPath) {
    globals.logger.info(`Creating an artifact of type '${artifactTemplate.type}' and language '${language}'`);
    globals.boilerPlatesManager.createArtifactInstance(artifactTemplate, destinationPath, context);
        
}