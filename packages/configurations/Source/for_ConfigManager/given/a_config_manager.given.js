/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ConfigManager } from '../../../ConfigManager';

export class a_config_manager {
    constructor() {
        this.configParser = {
            parse: sinon.stub()
        };
        this.fs = {
            existsSync: sinon.stub().returns(false),
            ensureDirSync: sinon.stub(),
            writeFile: sinon.stub()
        };

        this.configManager = new ConfigManager(this.fs, this.configParser, logger);
    }
}