
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICanRegisterProviders, IProviderRegistrators} from './index';
import { ILoggers } from '@dolittle/tooling.common.logging';

/**
 * Represents an implementation of {IProviderRegistrators}
 *
 * @export
 * @class ProviderRegistrators
 * @implements {IProviderRegistrators}
 */
export class ProviderRegistrators implements IProviderRegistrators {
    
    private _hasRegistered = false;
    private _registrators: ICanRegisterProviders[] = [];
    
    constructor(private _logger: ILoggers) {}

    get hasRegistered() { 
        return this._hasRegistered;
    }

    register() {
        if (this._hasRegistered) {
            this._logger.info('Providers already registered to the command manager');
        }
        else {
            this._logger.info('Registering providers to the command manager');
            this._hasRegistered = true;

            this._registrators.forEach(_ => _.register())
        }

    }

    addRegistrators(...registrators: ICanRegisterProviders[]) {
        this._registrators.push(...registrators)
    }
}
