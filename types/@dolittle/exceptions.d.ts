declare module '@dolittle/exceptions' {
    /**
     * Defines a base for structured exceptions
     *
     * @class Exception
     */
    export class Exception {
        /**
         * Initializes an instance of {Exception}.
         * @param {string} message
         * @memberof Exception
         */
        constructor(message: string);
        /**
         * Get the message for the exception
         *
         * @type {string}
         * @memberof Exception
         */
        readonly message: string;
        /**
         * Throw an instance of the exception
         *
         * @static
         */
        static throw(): void
    }
} 

