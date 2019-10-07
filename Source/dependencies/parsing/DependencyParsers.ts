/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { IDependencyParsers, IDependency, ICanParseDependencies, MultipleParsersForDependency, CannotParseDependency  } from '../internal';

/**
 * Represents an implementation of {IDependencyParsers} responsible for parsing an object into a Dependency
 *
 * @export
 * @interface IDependencyParser
 */
export class DependencyParsers implements IDependencyParsers {
    
    /**
     * Instantiates an instance of {DependencyParsers}.
     * @param {ICanParseDependencies[]} _parsers
     */
    constructor(private _parsers: ICanParseDependencies[], private _loggers: ILoggers) {}
    
    get parsers() {
        return this._parsers;
    }

    add(...parsers: ICanParseDependencies[]) {
        this._parsers.push(...parsers);
    }
    
    parse(obj: any, name: string): IDependency {
        this._loggers.info(`Parsing dependency ${name}`);
        let parser: ICanParseDependencies | null = null;

        this._parsers.forEach(_ => {
            if (_.canParse(obj)) {
                if (parser !== null) throw new MultipleParsersForDependency(name);
                parser = _;
            }
        });
        if (parser === null) throw new CannotParseDependency(name);
        let parsedDependency = (parser as ICanParseDependencies).parse(obj, name);
        this._loggers.info('Parsed dependency');
        return parsedDependency;
    }

}