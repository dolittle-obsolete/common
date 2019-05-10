/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from 'path';
/**
 * Stolen from https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 * Returns a function that returns a function that groups an array of object by a property name, key
 */
export var groupBy = function (key) { return function (array) {
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
export function getFileDirPath(filePath) {
    filePath = path.normalize(filePath);
    return path.parse(filePath).dir;
}
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileName(filePath) {
    filePath = path.normalize(filePath);
    return path.parse(filePath).name;
}
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileNameAndExtension(filePath) {
    filePath = path.normalize(filePath);
    return path.parse(filePath).base;
}
/**
  * Gets the directory name
  * @param {string} filePath
  * @returns {string} file dirname
  */
export function getFileDir(filePath) {
    filePath = path.normalize(filePath);
    return path.dirname(filePath);
}
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
export function determineDestination(area, language, name, cwd, boundedContextPath, dolittleConfig) {
    var config = dolittleConfig[language];
    if (config === undefined || config === null)
        throw new Error("No configuration for language " + language);
    var areaName = config[area];
    if (areaName === undefined || areaName === null)
        throw new Error("No configuration for area " + area + " for language " + language);
    var boundedContextRoot = path.dirname(boundedContextPath);
    var regExp = new RegExp("(" + escapeRegex(boundedContextRoot) + ")" + // Match first part of path (root of bounded-context) 
        ("(?:" + escapeRegex(path.sep) + "[^" + escapeRegex(path.sep) + "]+)?") + // Non-matching group matching the segment after the bounded-context root folder. This indicates the area of the artifact
        ("(" + escapeRegex(path.sep) + "?.*)") // Match all the segments after the area
    );
    var newDestination = cwd.replace(regExp, '$1' + path.sep + areaName + '$2');
    var splittedName = name.split('.');
    var featurePath = path.sep + splittedName.slice(0, -1).join(path.sep);
    return { destination: newDestination + featurePath, name: splittedName[splittedName.length - 1] };
}
function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
/**
 * @type {string[]} List of the artifact areas
 */
export var areas = [
    'concepts',
    'domain',
    'events',
    'read'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbImhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnR0FHZ0c7QUFFaEcsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxVQUFDLEdBQVcsSUFBSyxPQUFBLFVBQUMsS0FBWTtJQUNqRCxPQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxpQkFBaUIsRUFBRSxHQUFHO1FBQ2hDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RSxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUMsRUFBRSxFQUFFLENBQUM7QUFKTixDQUlNLEVBTDhCLENBSzlCLENBQUM7QUFDWDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxRQUFnQjtJQUMzQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3BDLENBQUM7QUFDRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUFnQjtJQUN4QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3JDLENBQUM7QUFDRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFFBQWdCO0lBQ3BELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDckMsQ0FBQztBQUNEOzs7O0lBSUk7QUFDSixNQUFNLFVBQVUsVUFBVSxDQUFDLFFBQWdCO0lBQ3ZDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsSUFBWSxFQUFFLEdBQVcsRUFBRSxrQkFBMEIsRUFBRSxjQUFtQjtJQUMzSSxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQWlDLFFBQVUsQ0FBQyxDQUFDO0lBQ2pFLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUk7UUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBNkIsSUFBSSxzQkFBaUIsUUFBVSxDQUFDLENBQUM7SUFDbEYsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDNUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQ3JCLE1BQUksV0FBVyxDQUFDLGtCQUFrQixDQUFDLE1BQUcsR0FBRyxzREFBc0Q7U0FDL0YsUUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQU0sQ0FBQSxHQUFHLHlIQUF5SDtTQUN2TCxNQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQU0sQ0FBQSxDQUFDLHdDQUF3QztLQUUzRSxDQUFDO0lBQ0YsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBRTlFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxjQUFjLEdBQUcsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDO0FBQ3BHLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFTO0lBQzFCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxLQUFLLEdBQWE7SUFDM0IsVUFBVTtJQUNWLFFBQVE7SUFDUixRQUFRO0lBQ1IsTUFBTTtDQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLyoqXG4gKiBTdG9sZW4gZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9KYW1pZU1hc29uLzA1NjZmODQxMmFmOWZlNmExZDQ3MGFhMWUwODlhNzUyXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBncm91cHMgYW4gYXJyYXkgb2Ygb2JqZWN0IGJ5IGEgcHJvcGVydHkgbmFtZSwga2V5IFxuICovXG5leHBvcnQgY29uc3QgZ3JvdXBCeSA9IChrZXk6IHN0cmluZykgPT4gKGFycmF5OiBhbnlbXSkgPT5cbiAgICBhcnJheS5yZWR1Y2UoKG9iamVjdHNCeUtleVZhbHVlLCBvYmopID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgb2JqZWN0c0J5S2V5VmFsdWVbdmFsdWVdID0gKG9iamVjdHNCeUtleVZhbHVlW3ZhbHVlXSB8fCBbXSkuY29uY2F0KG9iaik7XG4gICAgICAgIHJldHVybiBvYmplY3RzQnlLZXlWYWx1ZTtcbiAgICB9LCB7fSk7XG4vKipcbiAqIEdldHMgdGhlIGZ1bGwgZGlyZWN0b3J5IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICogQHJldHVybnMge3N0cmluZ30gZGlyZWN0b3J5IHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5kaXI7XG59XG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGhvdXQgZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkubmFtZTtcbn1cbi8qKlxuICogR2V0cyB0aGUgZmlsZW5hbWUgd2l0aCBleHRlbnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICogQHJldHVybnMge3N0cmluZ30gZmlsZW5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5iYXNlO1xufVxuLyoqXG4gICogR2V0cyB0aGUgZGlyZWN0b3J5IG5hbWVcbiAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAgKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlIGRpcm5hbWVcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRGlyKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSBkZXN0aW5hdGlvbiBvZiBhbiBhcnRpZmFjdCBnaXZlbiB0aGUgYXJlYSwgdGhlIGNvcmUgbGFuZ3VhZ2UsIHRoZSBpbnB1dCBuYW1lIG9mIGFydGlmYWN0LCBjd2QgYW5kIHBhdGggb2YgdGhlIGJvdW5kZWQgY29udGV4dFxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gYXJlYSBBcmVhIG9mIHRoZSBhcnRpZmFjdCAocmVhZCwgZXZlbnRzLCBkb21haW4sIGNvbmNlcHRzKVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBjb3JlIGxhbmd1YWdlIG9mIHRoZSBib3VuZGVkIGNvbnRleHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBpbnB1dHRlZCBuYW1lIG9mIHRoZSBhcnRpZmFjdCAoZG90cywgJy4nLCB1c2VkIHRvIGRlcml2ZSBmZWF0dXJlL21vZHVsZSBwYXRoIClcbiAqIEBwYXJhbSB7c3RyaW5nfSBjd2QgVGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGVkQ29udGV4dFBhdGggVGhlIHBhdGggb2YgdGhlIGJvdW5kZWQtY29udGV4dC5qc29uIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7YW55fSBkb2xpdHRsZUNvbmZpZyBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRoYXQgdGVsbHMgdXMgd2hhdCBmb2xkZXIgYW4gYXJ0aWZhY3Qgc2hvdWxkIGdvIGludG8gZGVwZW5kaW5nIG9uIHRoZSBhcmVhXG4gKiBcbiAqIEByZXR1cm5zIHt7ZGVzdGluYXRpb246IHN0cmluZywgbmFtZTogc3RyaW5nfX0gVGhlIGRlc3RpbmF0aW9uIHBhdGggYW5kIHRoZSBhY3R1YWwgbmFtZSBvZiB0aGUgYXJ0aWZhY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZURlc3RpbmF0aW9uKGFyZWE6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjd2Q6IHN0cmluZywgYm91bmRlZENvbnRleHRQYXRoOiBzdHJpbmcsIGRvbGl0dGxlQ29uZmlnOiBhbnkpOiB7IGRlc3RpbmF0aW9uOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgfXtcbiAgICBsZXQgY29uZmlnID0gZG9saXR0bGVDb25maWdbbGFuZ3VhZ2VdO1xuICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCB8fCBjb25maWcgPT09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gY29uZmlndXJhdGlvbiBmb3IgbGFuZ3VhZ2UgJHtsYW5ndWFnZX1gKTtcbiAgICBjb25zdCBhcmVhTmFtZSA9IGNvbmZpZ1thcmVhXTtcbiAgICBpZiAoYXJlYU5hbWUgPT09IHVuZGVmaW5lZCB8fCBhcmVhTmFtZSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBjb25maWd1cmF0aW9uIGZvciBhcmVhICR7YXJlYX0gZm9yIGxhbmd1YWdlICR7bGFuZ3VhZ2V9YCk7XG4gICAgY29uc3QgYm91bmRlZENvbnRleHRSb290ID0gcGF0aC5kaXJuYW1lKGJvdW5kZWRDb250ZXh0UGF0aCk7XG4gICAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICAgYCgke2VzY2FwZVJlZ2V4KGJvdW5kZWRDb250ZXh0Um9vdCl9KWAgKyAvLyBNYXRjaCBmaXJzdCBwYXJ0IG9mIHBhdGggKHJvb3Qgb2YgYm91bmRlZC1jb250ZXh0KSBcbiAgICAgICAgYCg/OiR7ZXNjYXBlUmVnZXgocGF0aC5zZXApfVteJHtlc2NhcGVSZWdleChwYXRoLnNlcCl9XSspP2AgKyAvLyBOb24tbWF0Y2hpbmcgZ3JvdXAgbWF0Y2hpbmcgdGhlIHNlZ21lbnQgYWZ0ZXIgdGhlIGJvdW5kZWQtY29udGV4dCByb290IGZvbGRlci4gVGhpcyBpbmRpY2F0ZXMgdGhlIGFyZWEgb2YgdGhlIGFydGlmYWN0XG4gICAgICAgIGAoJHtlc2NhcGVSZWdleChwYXRoLnNlcCl9Py4qKWAgLy8gTWF0Y2ggYWxsIHRoZSBzZWdtZW50cyBhZnRlciB0aGUgYXJlYVxuICAgICAgICBcbiAgICApO1xuICAgIGNvbnN0IG5ld0Rlc3RpbmF0aW9uID0gY3dkLnJlcGxhY2UocmVnRXhwLCAnJDEnICsgcGF0aC5zZXAgKyBhcmVhTmFtZSArICckMicpO1xuXG4gICAgbGV0IHNwbGl0dGVkTmFtZSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBmZWF0dXJlUGF0aCA9IHBhdGguc2VwICsgc3BsaXR0ZWROYW1lLnNsaWNlKDAsIC0xKS5qb2luKHBhdGguc2VwKTtcbiAgICByZXR1cm4ge2Rlc3RpbmF0aW9uOiBuZXdEZXN0aW5hdGlvbiArIGZlYXR1cmVQYXRoLCBuYW1lOiBzcGxpdHRlZE5hbWVbc3BsaXR0ZWROYW1lLmxlbmd0aCAtIDFdfTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlUmVnZXgoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbn1cblxuLyoqXG4gKiBAdHlwZSB7c3RyaW5nW119IExpc3Qgb2YgdGhlIGFydGlmYWN0IGFyZWFzXG4gKi9cbmV4cG9ydCBjb25zdCBhcmVhczogc3RyaW5nW10gPSBbXG4gICAgJ2NvbmNlcHRzJyxcbiAgICAnZG9tYWluJyxcbiAgICAnZXZlbnRzJyxcbiAgICAncmVhZCdcbl07Il19