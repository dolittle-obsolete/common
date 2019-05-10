/**
 * Represents a globally unique identifier
 *
 * @export
 * @class Guid
 */
export declare class Guid {
    /**
     * Get the empty representation of a {Guid}
     *
     * @readonly
     * @static
     * @returns {string}
     * @memberof Guid
     */
    static readonly empty: string;
    /**
     * Create a new {Guid} as {string}
     *
     * @static
     * @returns {string} String representation of {Guid}
     * @memberof Guid
     */
    static create(): string;
}
