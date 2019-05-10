/**
 * Stolen from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 * Returns a function that returns a function that groups an array of object by a property name, key
 */
export declare const groupBy: (key: string) => (array: any[]) => any;
/**
 * Gets the full directory path
 * @param {string} filePath
 * @returns {string} directory path
 */
export declare function getFileDirPath(filePath: string): string;
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
export declare function getFileName(filePath: string): string;
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
export declare function getFileNameAndExtension(filePath: string): string;
/**
  * Gets the directory name
  * @param {string} filePath
  * @returns {string} file dirname
  */
export declare function getFileDir(filePath: string): string;
/**
 * Determines the destination of an artifact given the area, the core language, the input name of artifact, cwd and path of the bounded context
 *
 * @param {string} area Area of the artifact (read, events, domain, concepts)
 * @param {string} language The core language of the bounded context
 * @param {string} name The inputted name of the artifact (dots, '.', used to derive feature/module path )
 * @param {string} cwd The current working directory
 * @param {string} boundedContextPath The path of the bounded-context.json configuration
 * @param {any} dolittleConfig A configuration object that tells us what folder an artifact should go into depending on the area
 *
 * @returns {{destination: string, name: string}} The destination path and the actual name of the artifact
 */
export declare function determineDestination(area: string, language: string, name: string, cwd: string, boundedContextPath: string, dolittleConfig: any): {
    destination: string;
    name: string;
};
/**
 * @type {string[]} List of the artifact areas
 */
export declare const areas: string[];
