
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import {ICanRegisterProviders, IProviderRegistrators} from '../index';

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

    async register() {
        if (this._hasRegistered) {
            this._logger.info('Providers already registered to the command manager');
        }
        else {
            this._logger.info('Registering providers to the command manager');
            this._hasRegistered = true;

            await Promise.all(this._registrators.map(_ => _.register()));
        }
    }

    addRegistrators(...registrators: ICanRegisterProviders[]) {
        this._logger.info('Adding provider registrators');
        this._registrators.push(...registrators)
    }
}
