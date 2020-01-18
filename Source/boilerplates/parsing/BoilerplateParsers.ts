/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanParseBoilerplates, IBoilerplateParsers, MultipleParsersForBoilerplate, CannotParseBoilerplate } from '../internal';

/**
 * Represents an implementation of {IBoilerplateParsers}
 *
 * @export
 * @class BoilerplateParsers
 */
export class BoilerplateParsers implements IBoilerplateParsers {

    /**
     * Instantiates an instance of {BoilerplateParsers}.
     * @param {ICanParseBoilerplates[]} _parsers
     */
    constructor(private _parsers: ICanParseBoilerplates[], private _loggers: ILoggers) {}

    get parsers() { return this._parsers;}

    canParse(boilerplate: any, boilerplatePath: string) {
        let parser: ICanParseBoilerplates | null = null;

        for (const _ of this._parsers) {
            if (_.canParse(boilerplate)) {
                if (parser !== null) throw new MultipleParsersForBoilerplate(boilerplatePath);
                parser = _;
            }
        }
        return parser !== null;

    }

    async parse(boilerplate: any, boilerplatePath: string) {
        this._loggers.info('Parsing boilerplate');

        if (! this.canParse(boilerplate, boilerplatePath)) throw new CannotParseBoilerplate(boilerplatePath);
        const parser = this._parsers.find(parser => parser.canParse(boilerplate));
        const parsedBoilerplate = await parser!.parse(boilerplate, boilerplatePath);

        this._loggers.info('Finished parsing boilerplate');
        return parsedBoilerplate;
    }

    add(...parsers: ICanParseBoilerplates[]) {
        this._parsers.push(...parsers);
    }
}
