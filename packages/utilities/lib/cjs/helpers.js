"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
/**
 * Stolen from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 * Returns a function that returns a function that groups an array of object by a property name, key
 */
exports.groupBy = function (key) { return function (array) {
    return array.reduce(function (objectsByKeyValue, obj) {
        var value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});
}; };
/**
 * Gets the full directory path
 * @param {string} filePath
 * @returns {string} directory path
 */
function getFileDirPath(filePath) {
    filePath = path_1.default.normalize(filePath);
    return path_1.default.parse(filePath).dir;
}
exports.getFileDirPath = getFileDirPath;
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
function getFileName(filePath) {
    filePath = path_1.default.normalize(filePath);
    return path_1.default.parse(filePath).name;
}
exports.getFileName = getFileName;
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
function getFileNameAndExtension(filePath) {
    filePath = path_1.default.normalize(filePath);
    return path_1.default.parse(filePath).base;
}
exports.getFileNameAndExtension = getFileNameAndExtension;
/**
  * Gets the directory name
  * @param {string} filePath
  * @returns {string} file dirname
  */
function getFileDir(filePath) {
    filePath = path_1.default.normalize(filePath);
    return path_1.default.dirname(filePath);
}
exports.getFileDir = getFileDir;
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
function determineDestination(area, language, name, cwd, boundedContextPath, dolittleConfig) {
    var config = dolittleConfig[language];
    if (config === undefined || config === null)
        throw new Error("No configuration for language " + language);
    var areaName = config[area];
    if (areaName === undefined || areaName === null)
        throw new Error("No configuration for area " + area + " for language " + language);
    var boundedContextRoot = path_1.default.dirname(boundedContextPath);
    var regExp = new RegExp("(" + escapeRegex(boundedContextRoot) + ")" + // Match first part of path (root of bounded-context) 
        ("(?:" + escapeRegex(path_1.default.sep) + "[^" + escapeRegex(path_1.default.sep) + "]+)?") + // Non-matching group matching the segment after the bounded-context root folder. This indicates the area of the artifact
        ("(" + escapeRegex(path_1.default.sep) + "?.*)") // Match all the segments after the area
    );
    var newDestination = cwd.replace(regExp, '$1' + path_1.default.sep + areaName + '$2');
    var splittedName = name.split('.');
    var featurePath = path_1.default.sep + splittedName.slice(0, -1).join(path_1.default.sep);
    return { destination: newDestination + featurePath, name: splittedName[splittedName.length - 1] };
}
exports.determineDestination = determineDestination;
function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
/**
 * @type {string[]} List of the artifact areas
 */
exports.areas = [
    'concepts',
    'domain',
    'events',
    'read'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbImhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOzs7OztBQUVoRyw4Q0FBd0I7QUFDeEI7OztHQUdHO0FBQ1UsUUFBQSxPQUFPLEdBQUcsVUFBQyxHQUFXLElBQUssT0FBQSxVQUFDLEtBQVk7SUFDakQsT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsaUJBQWlCLEVBQUUsR0FBRztRQUNoQyxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBSk4sQ0FJTSxFQUw4QixDQUs5QixDQUFDO0FBQ1g7Ozs7R0FJRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxRQUFnQjtJQUMzQyxRQUFRLEdBQUcsY0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxPQUFPLGNBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3BDLENBQUM7QUFIRCx3Q0FHQztBQUNEOzs7O0dBSUc7QUFDSCxTQUFnQixXQUFXLENBQUMsUUFBZ0I7SUFDeEMsUUFBUSxHQUFHLGNBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsT0FBTyxjQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNyQyxDQUFDO0FBSEQsa0NBR0M7QUFDRDs7OztHQUlHO0FBQ0gsU0FBZ0IsdUJBQXVCLENBQUMsUUFBZ0I7SUFDcEQsUUFBUSxHQUFHLGNBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsT0FBTyxjQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNyQyxDQUFDO0FBSEQsMERBR0M7QUFDRDs7OztJQUlJO0FBQ0osU0FBZ0IsVUFBVSxDQUFDLFFBQWdCO0lBQ3ZDLFFBQVEsR0FBRyxjQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBSEQsZ0NBR0M7QUFDRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsa0JBQTBCLEVBQUUsY0FBbUI7SUFDM0ksSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFpQyxRQUFVLENBQUMsQ0FBQztJQUNqRSxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJO1FBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQTZCLElBQUksc0JBQWlCLFFBQVUsQ0FBQyxDQUFDO0lBQ2xGLElBQU0sa0JBQWtCLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzVELElBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUNyQixNQUFJLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFHLEdBQUcsc0RBQXNEO1NBQy9GLFFBQU0sV0FBVyxDQUFDLGNBQUksQ0FBQyxHQUFHLENBQUMsVUFBSyxXQUFXLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFNLENBQUEsR0FBRyx5SEFBeUg7U0FDdkwsTUFBSSxXQUFXLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFNLENBQUEsQ0FBQyx3Q0FBd0M7S0FFM0UsQ0FBQztJQUNGLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxjQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUU5RSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLElBQU0sV0FBVyxHQUFHLGNBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sRUFBQyxXQUFXLEVBQUUsY0FBYyxHQUFHLFdBQVcsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQztBQUNwRyxDQUFDO0FBbkJELG9EQW1CQztBQUVELFNBQVMsV0FBVyxDQUFDLENBQVM7SUFDMUIsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRDs7R0FFRztBQUNVLFFBQUEsS0FBSyxHQUFhO0lBQzNCLFVBQVU7SUFDVixRQUFRO0lBQ1IsUUFBUTtJQUNSLE1BQU07Q0FDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbi8qKlxuICogU3RvbGVuIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vSmFtaWVNYXNvbi8wNTY2Zjg0MTJhZjlmZTZhMWQ0NzBhYTFlMDg5YTc1MlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZ3JvdXBzIGFuIGFycmF5IG9mIG9iamVjdCBieSBhIHByb3BlcnR5IG5hbWUsIGtleSBcbiAqL1xuZXhwb3J0IGNvbnN0IGdyb3VwQnkgPSAoa2V5OiBzdHJpbmcpID0+IChhcnJheTogYW55W10pID0+XG4gICAgYXJyYXkucmVkdWNlKChvYmplY3RzQnlLZXlWYWx1ZSwgb2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIG9iamVjdHNCeUtleVZhbHVlW3ZhbHVlXSA9IChvYmplY3RzQnlLZXlWYWx1ZVt2YWx1ZV0gfHwgW10pLmNvbmNhdChvYmopO1xuICAgICAgICByZXR1cm4gb2JqZWN0c0J5S2V5VmFsdWU7XG4gICAgfSwge30pO1xuLyoqXG4gKiBHZXRzIHRoZSBmdWxsIGRpcmVjdG9yeSBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGRpcmVjdG9yeSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRGlyUGF0aChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuZGlyO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU5hbWUoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZVBhdGgpLm5hbWU7XG59XG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGggZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbihmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuYmFzZTtcbn1cbi8qKlxuICAqIEdldHMgdGhlIGRpcmVjdG9yeSBuYW1lXG4gICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gICogQHJldHVybnMge3N0cmluZ30gZmlsZSBkaXJuYW1lXG4gICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZURpcihmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5kaXJuYW1lKGZpbGVQYXRoKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lcyB0aGUgZGVzdGluYXRpb24gb2YgYW4gYXJ0aWZhY3QgZ2l2ZW4gdGhlIGFyZWEsIHRoZSBjb3JlIGxhbmd1YWdlLCB0aGUgaW5wdXQgbmFtZSBvZiBhcnRpZmFjdCwgY3dkIGFuZCBwYXRoIG9mIHRoZSBib3VuZGVkIGNvbnRleHRcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGFyZWEgQXJlYSBvZiB0aGUgYXJ0aWZhY3QgKHJlYWQsIGV2ZW50cywgZG9tYWluLCBjb25jZXB0cylcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgY29yZSBsYW5ndWFnZSBvZiB0aGUgYm91bmRlZCBjb250ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgaW5wdXR0ZWQgbmFtZSBvZiB0aGUgYXJ0aWZhY3QgKGRvdHMsICcuJywgdXNlZCB0byBkZXJpdmUgZmVhdHVyZS9tb2R1bGUgcGF0aCApXG4gKiBAcGFyYW0ge3N0cmluZ30gY3dkIFRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5XG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRlZENvbnRleHRQYXRoIFRoZSBwYXRoIG9mIHRoZSBib3VuZGVkLWNvbnRleHQuanNvbiBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge2FueX0gZG9saXR0bGVDb25maWcgQSBjb25maWd1cmF0aW9uIG9iamVjdCB0aGF0IHRlbGxzIHVzIHdoYXQgZm9sZGVyIGFuIGFydGlmYWN0IHNob3VsZCBnbyBpbnRvIGRlcGVuZGluZyBvbiB0aGUgYXJlYVxuICogXG4gKiBAcmV0dXJucyB7e2Rlc3RpbmF0aW9uOiBzdHJpbmcsIG5hbWU6IHN0cmluZ319IFRoZSBkZXN0aW5hdGlvbiBwYXRoIGFuZCB0aGUgYWN0dWFsIG5hbWUgb2YgdGhlIGFydGlmYWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmVEZXN0aW5hdGlvbihhcmVhOiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY3dkOiBzdHJpbmcsIGJvdW5kZWRDb250ZXh0UGF0aDogc3RyaW5nLCBkb2xpdHRsZUNvbmZpZzogYW55KTogeyBkZXN0aW5hdGlvbjogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IH17XG4gICAgbGV0IGNvbmZpZyA9IGRvbGl0dGxlQ29uZmlnW2xhbmd1YWdlXTtcbiAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQgfHwgY29uZmlnID09PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlICR7bGFuZ3VhZ2V9YCk7XG4gICAgY29uc3QgYXJlYU5hbWUgPSBjb25maWdbYXJlYV07XG4gICAgaWYgKGFyZWFOYW1lID09PSB1bmRlZmluZWQgfHwgYXJlYU5hbWUgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gY29uZmlndXJhdGlvbiBmb3IgYXJlYSAke2FyZWF9IGZvciBsYW5ndWFnZSAke2xhbmd1YWdlfWApO1xuICAgIGNvbnN0IGJvdW5kZWRDb250ZXh0Um9vdCA9IHBhdGguZGlybmFtZShib3VuZGVkQ29udGV4dFBhdGgpO1xuICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoXG4gICAgICAgIGAoJHtlc2NhcGVSZWdleChib3VuZGVkQ29udGV4dFJvb3QpfSlgICsgLy8gTWF0Y2ggZmlyc3QgcGFydCBvZiBwYXRoIChyb290IG9mIGJvdW5kZWQtY29udGV4dCkgXG4gICAgICAgIGAoPzoke2VzY2FwZVJlZ2V4KHBhdGguc2VwKX1bXiR7ZXNjYXBlUmVnZXgocGF0aC5zZXApfV0rKT9gICsgLy8gTm9uLW1hdGNoaW5nIGdyb3VwIG1hdGNoaW5nIHRoZSBzZWdtZW50IGFmdGVyIHRoZSBib3VuZGVkLWNvbnRleHQgcm9vdCBmb2xkZXIuIFRoaXMgaW5kaWNhdGVzIHRoZSBhcmVhIG9mIHRoZSBhcnRpZmFjdFxuICAgICAgICBgKCR7ZXNjYXBlUmVnZXgocGF0aC5zZXApfT8uKilgIC8vIE1hdGNoIGFsbCB0aGUgc2VnbWVudHMgYWZ0ZXIgdGhlIGFyZWFcbiAgICAgICAgXG4gICAgKTtcbiAgICBjb25zdCBuZXdEZXN0aW5hdGlvbiA9IGN3ZC5yZXBsYWNlKHJlZ0V4cCwgJyQxJyArIHBhdGguc2VwICsgYXJlYU5hbWUgKyAnJDInKTtcblxuICAgIGxldCBzcGxpdHRlZE5hbWUgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgZmVhdHVyZVBhdGggPSBwYXRoLnNlcCArIHNwbGl0dGVkTmFtZS5zbGljZSgwLCAtMSkuam9pbihwYXRoLnNlcCk7XG4gICAgcmV0dXJuIHtkZXN0aW5hdGlvbjogbmV3RGVzdGluYXRpb24gKyBmZWF0dXJlUGF0aCwgbmFtZTogc3BsaXR0ZWROYW1lW3NwbGl0dGVkTmFtZS5sZW5ndGggLSAxXX07XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG59XG5cbi8qKlxuICogQHR5cGUge3N0cmluZ1tdfSBMaXN0IG9mIHRoZSBhcnRpZmFjdCBhcmVhc1xuICovXG5leHBvcnQgY29uc3QgYXJlYXM6IHN0cmluZ1tdID0gW1xuICAgICdjb25jZXB0cycsXG4gICAgJ2RvbWFpbicsXG4gICAgJ2V2ZW50cycsXG4gICAgJ3JlYWQnXG5dOyJdfQ==