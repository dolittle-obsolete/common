/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanParseBoilerplates, IBoilerplateParsers, MultipleParsersForBoilerplate, CannotParseBoilerplate } from "./index";
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
    constructor(private _parsers: ICanParseBoilerplates[]) {}

    get parsers() { return this._parsers;}

    canParse(boilerplate: any) {
        let parser: ICanParseBoilerplates | null = null;

        for (let _ of this._parsers) {
            if (_.canParse(boilerplate)) {
                if (parser !== null) throw MultipleParsersForBoilerplate.new;
                parser = _;
            }
        }
        return parser !== null;

    }
    
    parse(boilerplate: any, boilerplatePath: string) {
        if (! this.canParse(boilerplate)) throw CannotParseBoilerplate.new;
        return this._parsers.find(parser => parser.canParse(boilerplate))!.parse(boilerplate, boilerplatePath);
    }

    add(...parsers: ICanParseBoilerplates[]) {
        this._parsers.push(...parsers);
    }
}