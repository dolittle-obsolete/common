/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Defines the interface of a busy indicator, for example for CLI applications this could be Ora spinner.
 *
 * @export
 * @interface IBusyIndicator
 */
export interface IBusyIndicator {

    /**
     * Gets the text. Returns undefined if internal busy indicator object is not created
     *
     * @type {string}
     */
    text: string | undefined
   
    /**
     * Whether or not the indicator is busy
     *
     * @type {boolean}
     */
    readonly isBusy: boolean


    /**
     * Creates a new busy indicator
     *
     * @param {string} [text]
     * @returns {IBusyIndicator}
     */
    createNew(text?: string): IBusyIndicator
    
    /**
     * Starts the busy indicator
     *
     * @param {string} text
     */
    start(text?: string): IBusyIndicator

    /**
     * Stops the busy indicator and removes it
     *
     * @returns {IBusyIndicator}
     */
    stop(): IBusyIndicator
    
    /**
     * Stops and persists the current text or the given text
     *
     * @param {string} [text]
     * @returns {IBusyIndicator}
     */
    stopAndPersist(text?: string): IBusyIndicator

    /**
     * Stops and persists the current or given text in a success state
     *
     * @param {string} [text]
     * @returns {IBusyIndicator}
     */
    succeed(text?: string): IBusyIndicator

    /**
     * Stops and persists the current or given text in a failed state
     *
     * @param {string} [text]
     * @returns {IBusyIndicator}
     */
    fail(text?: string): IBusyIndicator

    /**
     * Stops and persists the current or given text in an info state
     *
     * @param {string} [text]
     * @returns {IBusyIndicator}
     */
    info(text?: string): IBusyIndicator

    /**
     * Stops and persists the current or given text in a warning state
     *
     * @param {string} [text]
     * @returns {IBusyIndicator}
     */
    warn(text?: string): IBusyIndicator

}