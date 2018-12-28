/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoilerPlatesManager } from '../../BoilerPlatesManager';
import { a_boiler_plates_manager } from './a_boiler_plates_manager';
import { BoilerPlate } from '../../BoilerPlate';

const path = require('path').resolve('somewhere', 'on', 'the', 'disk');

const boilerPlates = [
    new BoilerPlate('csharp', 'C# Application', 'some description', 'application', [], path, [], [] ),
    new BoilerPlate('csharp', 'C# BoundedContext', 'some description', 'boundedContext', [], path, [], [] ),
    new BoilerPlate('javascript', 'Javascript Application', 'some description', 'application', [], path, [], [] ),
    new BoilerPlate('javascript', 'Javascript BoundedContext', 'some description', 'boundedContext', [], path, [], [] )
];

export class all_supported_boiler_plates extends a_boiler_plates_manager {
    constructor() {
        super();
        this.boilerPlates = boilerPlates;

        this.fileSystem.existsSync = sinon.stub().returns(true);
        this.fileSystem.readFileSync = sinon.stub().returns(JSON.stringify(boilerPlates.map(_ => _.toJson())));

        this.boilerPlatesManager = new BoilerPlatesManager(
            this.configManager,
            this.httpWrapper,
            this.git,
            this.folders,
            this.fileSystem,
            logger
        );
    }
}