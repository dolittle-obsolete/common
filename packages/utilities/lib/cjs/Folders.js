"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var path = __importStar(require("path"));
var helpers_1 = require("./helpers");
/**
 * Represents helpers for working with folders
 */
var Folders = /** @class */ (function () {
    /**
     * Initializes a new instance of {folders}
     * @param {typeof FsExtra)} fileSystem
     */
    function Folders(fileSystem) {
        this._fileSystem = fileSystem;
    }
    /**
     * Creates a feature from the current working directory.
     *
     * @param {string} cwd To create feature from
     * @param {string} feature The feature to create. The string can be '.' separated to signify sub features (parentFeature.subFeature.subSubFeature)
     * @param {string} boundedContextPath
     * @param {*} dolittleConfig
     * @memberof Folders
     */
    Folders.prototype.createFeature = function (cwd, feature, boundedContextPath, dolittleConfig) {
        var _this = this;
        helpers_1.areas.forEach(function (area) { return _this.makeFolderIfNotExists(helpers_1.determineDestination(area, 'csharp', feature + '.', cwd, boundedContextPath, dolittleConfig).destination); });
    };
    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     * @returns {void}
     * @memberof Folders
     */
    Folders.prototype.copy = function (destination, source) {
        destination = path.normalize(destination);
        source = path.normalize(source);
        this._fileSystem.copySync(source, destination);
    };
    /**
     * Create a folder if it does not exist
     * @param {string} folderPath Name of the folder to make sure exists
     * @returns {void}
     * @memberof Folders
     */
    Folders.prototype.makeFolderIfNotExists = function (folderPath) {
        folderPath = path.normalize(folderPath);
        try {
            this._fileSystem.ensureDirSync(folderPath);
        }
        catch (err) {
            try {
                var shell = require('shelljs');
                shell.mkdir('-p', folderPath);
            }
            catch (err) {
                throw new Error('Could not create directory');
            }
        }
    };
    /**
     * Get top level folders in a given path
     * @param {string} folder
     * @returns {string[]}
     * @memberof Folders
     */
    Folders.prototype.getFoldersIn = function (folder) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var dirInner = dirs_1[_i];
            var actualPath = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                results.push(actualPath);
            }
        }
        return results;
    };
    /**
     * Get top level folders in a given path
     * @param {string} folder path
     * @param {RegExp} regularExp
     * @returns {string[]} folder paths
     * @memberof Folders
     */
    Folders.prototype.getFoldersInRegex = function (folder, regularExp) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_2 = dirs; _i < dirs_2.length; _i++) {
            var dirInner = dirs_2[_i];
            var actualPath = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(actualPath);
            var regexMatch = path.parse(actualPath).name.match(regularExp);
            if (stat.isDirectory() && regexMatch && regexMatch.length > 0) {
                results.push(actualPath);
            }
        }
        return results;
    };
    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files
     * @memberof Folders
     */
    Folders.prototype.getFilesRecursivelyIn = function (folder) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_3 = dirs; _i < dirs_3.length; _i++) {
            var dirInner = dirs_3[_i];
            var actualPath = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                results = results.concat(this.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                results.push(actualPath);
            }
        }
        return results;
    };
    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {string[]} templateFileNames The template file names
     * @returns {string[]} Array of files
     * @memberof Folders
     */
    Folders.prototype.getArtifactTemplateFilesRecursivelyIn = function (folder, templateFileNames) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_4 = dirs; _i < dirs_4.length; _i++) {
            var dirInner = dirs_4[_i];
            var actualPath = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                results = results.concat(this.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                var filename = path.basename(actualPath);
                if (templateFileNames.includes(filename)) {
                    results.push(actualPath);
                }
            }
        }
        return results;
    };
    /**
     * Get all folders and files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files and folders
     * @memberof Folders
     */
    Folders.prototype.getFoldersAndFilesRecursivelyIn = function (folder) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_5 = dirs; _i < dirs_5.length; _i++) {
            var dirInner = dirs_5[_i];
            var actualPath = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(actualPath);
            if (stat.isDirectory()) {
                results = results.concat(this.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            results.push(actualPath);
        }
        return results;
    };
    /**
     * Search for a specific file pattern within a folder
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]}
     * @memberof Folders
     */
    Folders.prototype.searchFolder = function (folder, pattern) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_6 = dirs; _i < dirs_6.length; _i++) {
            var dirInner = dirs_6[_i];
            dirInner = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        }
        return results;
    };
    /**
     * Search for a specific file pattern within a folder with regex
     * @param {string} folder Folder to search from
     * @param {RegExp} regularExp The regex pattern of files to look for
     * @returns {string[]}
     * @memberof Folders
     */
    Folders.prototype.searchFolderRegex = function (folder, regularExp) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_7 = dirs; _i < dirs_7.length; _i++) {
            var dirInner = dirs_7[_i];
            dirInner = path.resolve(folder, dirInner);
            var regexMatch = dirInner.match(regularExp);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                results.push(dirInner);
            }
        }
        return results;
    };
    /**
     * Search for a specific file pattern within a folder, recursively
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]} The paths of the matching files
     * @memberof Folders
     */
    Folders.prototype.searchRecursive = function (folder, pattern) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_8 = dirs; _i < dirs_8.length; _i++) {
            var dirInner = dirs_8[_i];
            dirInner = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isDirectory()) {
                results = results.concat(this.searchRecursive(dirInner, pattern));
            }
            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        }
        return results;
    };
    /**
     * Search for a specific file with regular expression, recursively
     * @param {string} folder to search from
     * @param {string} regularExp Pattern of the files to look for
     * @returns {string[]} the paths of the matching files
     * @memberof Folders
     */
    Folders.prototype.searchRecursiveRegex = function (folder, regularExp) {
        folder = path.normalize(folder);
        var results = [];
        var dirs = this._fileSystem.readdirSync(folder);
        for (var _i = 0, dirs_9 = dirs; _i < dirs_9.length; _i++) {
            var dirInner = dirs_9[_i];
            dirInner = path.resolve(folder, dirInner);
            var stat = this._fileSystem.statSync(dirInner);
            if (stat.isDirectory()) {
                results = results.concat(this.searchRecursiveRegex(dirInner, regularExp));
            }
            var regexMatch = dirInner.match(regularExp);
            if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                results.push(dirInner);
            }
        }
        return results;
    };
    /**
     * Gets the paths of the nearest directories matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string[]} paths
     * @memberof Folders
     */
    Folders.prototype.getNearestDirsSearchingUpwards = function (folder, regularExp) {
        folder = path.normalize(folder);
        var results = [];
        while (this.isNotEmptyFolder(folder)) {
            var folders = this.getFoldersInRegex(folder, regularExp);
            if (folders.length > 0)
                results.push.apply(results, folders);
            folder = path.join(folder, '../');
            if (results.length > 0)
                break;
        }
        return results;
    };
    /**
     * Gets the path of the nearest file matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string} path
     * @memberof Folders
     */
    Folders.prototype.getNearestFileSearchingUpwards = function (folder, regularExp) {
        folder = path.normalize(folder);
        while (this.isNotEmptyFolder(folder)) {
            var results = this.searchFolderRegex(folder, regularExp);
            if (results.length >= 1)
                return results[0];
            folder = path.join(folder, '../');
        }
        return '';
    };
    /**
     * Whether or not the folder at path 'folder' is empty or not
     *
     * @param {string} folder
     * @returns {boolean}
     * @memberof Folders
     */
    Folders.prototype.isNotEmptyFolder = function (folder) {
        return folder !== null && folder !== '' && folder !== path.sep;
    };
    return Folders;
}());
exports.Folders = Folders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9sZGVycy5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbIkZvbGRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7OztnR0FHZ0c7QUFDaEcseUNBQTZCO0FBQzdCLHFDQUF3RDtBQUV4RDs7R0FFRztBQUNIO0lBR0k7OztPQUdHO0lBQ0gsaUJBQVksVUFBMEI7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0gsK0JBQWEsR0FBYixVQUFjLEdBQVcsRUFBRSxPQUFlLEVBQUUsa0JBQTBCLEVBQUUsY0FBbUI7UUFBM0YsaUJBRUM7UUFERyxlQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLDhCQUFvQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQXBJLENBQW9JLENBQUMsQ0FBQztJQUNoSyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsc0JBQUksR0FBSixVQUFLLFdBQW1CLEVBQUUsTUFBYztRQUVwQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsdUNBQXFCLEdBQXJCLFVBQXNCLFVBQWtCO1FBRXBDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLElBQUk7WUFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FB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Q2xCLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxFQUFTLE9BQU8sRUFBRTtZQUM3QixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2xCLE1BQU07U0FDYjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSCxnREFBOEIsR0FBOUIsVUFBK0IsTUFBYyxFQUFFLFVBQWtCO1FBQzdELE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUNwQztZQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekQsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNILGtDQUFnQixHQUFoQixVQUFpQixNQUFjO1FBQzNCLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssRUFBRSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ25FLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FBQyxBQWxVRCxJQWtVQztBQWxVWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBhcmVhcywgZGV0ZXJtaW5lRGVzdGluYXRpb24gfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0ICogYXMgRnNFeHRyYSBmcm9tICdmcy1leHRyYSc7XG4vKipcbiAqIFJlcHJlc2VudHMgaGVscGVycyBmb3Igd29ya2luZyB3aXRoIGZvbGRlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZvbGRlcnNcbntcbiAgICBwcml2YXRlIF9maWxlU3lzdGVtOiB0eXBlb2YgRnNFeHRyYTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Zm9sZGVyc31cbiAgICAgKiBAcGFyYW0ge3R5cGVvZiBGc0V4dHJhKX0gZmlsZVN5c3RlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtOiB0eXBlb2YgRnNFeHRyYSkge1xuICAgICAgICB0aGlzLl9maWxlU3lzdGVtID0gZmlsZVN5c3RlbTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZlYXR1cmUgZnJvbSB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS4gXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3dkIFRvIGNyZWF0ZSBmZWF0dXJlIGZyb21cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmVhdHVyZSBUaGUgZmVhdHVyZSB0byBjcmVhdGUuIFRoZSBzdHJpbmcgY2FuIGJlICcuJyBzZXBhcmF0ZWQgdG8gc2lnbmlmeSBzdWIgZmVhdHVyZXMgKHBhcmVudEZlYXR1cmUuc3ViRmVhdHVyZS5zdWJTdWJGZWF0dXJlKVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGVkQ29udGV4dFBhdGggXG4gICAgICogQHBhcmFtIHsqfSBkb2xpdHRsZUNvbmZpZ1xuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgY3JlYXRlRmVhdHVyZShjd2Q6IHN0cmluZywgZmVhdHVyZTogc3RyaW5nLCBib3VuZGVkQ29udGV4dFBhdGg6IHN0cmluZywgZG9saXR0bGVDb25maWc6IGFueSkge1xuICAgICAgICBhcmVhcy5mb3JFYWNoKGFyZWEgPT4gdGhpcy5tYWtlRm9sZGVySWZOb3RFeGlzdHMoZGV0ZXJtaW5lRGVzdGluYXRpb24oYXJlYSwgJ2NzaGFycCcsIGZlYXR1cmUgKyAnLicsIGN3ZCwgYm91bmRlZENvbnRleHRQYXRoLCBkb2xpdHRsZUNvbmZpZykuZGVzdGluYXRpb24pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3B5IG9uZSBmb2xkZXIgYW5kIGl0cyBjb250ZW50IHJlY3Vyc2l2ZWx5IHRvIGEgc3BlY2lmaWVkIGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIERlc3RpbmF0aW9uIHBhdGggdG8gY29weSB0b1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgU291cmNlIHBhdGggdG8gY29weSBmcm9tXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICogQG1lbWJlcm9mIEZvbGRlcnNcbiAgICAgKi9cbiAgICBjb3B5KGRlc3RpbmF0aW9uOiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgZGVzdGluYXRpb24gPSBwYXRoLm5vcm1hbGl6ZShkZXN0aW5hdGlvbik7XG4gICAgICAgIHNvdXJjZSA9IHBhdGgubm9ybWFsaXplKHNvdXJjZSk7XG4gICAgICAgIHRoaXMuX2ZpbGVTeXN0ZW0uY29weVN5bmMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZm9sZGVyIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlclBhdGggTmFtZSBvZiB0aGUgZm9sZGVyIHRvIG1ha2Ugc3VyZSBleGlzdHNcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKiBAbWVtYmVyb2YgRm9sZGVyc1xuICAgICAqL1xuICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0cyhmb2xkZXJQYXRoOiBzdHJpbmcpOiB2b2lkXG4gICAge1xuICAgICAgICBmb2xkZXJQYXRoID0gcGF0aC5ub3JtYWxpemUoZm9sZGVyUGF0aCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9maWxlU3lzdGVtLmVuc3VyZURpclN5bmMoZm9sZGVyUGF0aCk7XG4gICAgICAgIH0gY2F0Y2goZXJyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBzaGVsbCA9IHJlcXVpcmUoJ3NoZWxsanMnKTtcbiAgICAgICAgICAgICAgICBzaGVsbC5ta2RpcignLXAnLCBmb2xkZXJQYXRoKTtcbiAgICBcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgY3JlYXRlIGRpcmVjdG9yeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRvcCBsZXZlbCBmb2xkZXJzIGluIGEgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgZ2V0Rm9sZGVyc0luKGZvbGRlcjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGRpcnMgPSB0aGlzLl9maWxlU3lzdGVtLnJlYWRkaXJTeW5jKGZvbGRlcik7XG4gICAgICAgIGZvciAobGV0IGRpcklubmVyIG9mIGRpcnMpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSB0aGlzLl9maWxlU3lzdGVtLnN0YXRTeW5jKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdG9wIGxldmVsIGZvbGRlcnMgaW4gYSBnaXZlbiBwYXRoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBwYXRoIFxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWd1bGFyRXhwXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBmb2xkZXIgcGF0aHNcbiAgICAgKiBAbWVtYmVyb2YgRm9sZGVyc1xuICAgICAqL1xuICAgIGdldEZvbGRlcnNJblJlZ2V4KGZvbGRlcjogc3RyaW5nLCByZWd1bGFyRXhwOiBSZWdFeHApOiBzdHJpbmdbXSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCByZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBsZXQgZGlycyA9IHRoaXMuX2ZpbGVTeXN0ZW0ucmVhZGRpclN5bmMoZm9sZGVyKTtcbiAgICAgICAgZm9yIChsZXQgZGlySW5uZXIgb2YgZGlycykge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IHRoaXMuX2ZpbGVTeXN0ZW0uc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBsZXQgcmVnZXhNYXRjaCA9IHBhdGgucGFyc2UoYWN0dWFsUGF0aCkubmFtZS5tYXRjaChyZWd1bGFyRXhwKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkgJiYgcmVnZXhNYXRjaCAmJiByZWdleE1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmaWxlcyB3aXRoaW4gYSBzcGVjaWZpYyBmb2xkZXIgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIFBhdGggb2YgdGhlIGZvbGRlciB0byBnZXQgZnJvbVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgb2YgZmlsZXNcbiAgICAgKiBAbWVtYmVyb2YgRm9sZGVyc1xuICAgICAqL1xuICAgIGdldEZpbGVzUmVjdXJzaXZlbHlJbihmb2xkZXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgZm9sZGVyID0gcGF0aC5ub3JtYWxpemUoZm9sZGVyKTtcbiAgICAgICAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBkaXJzID0gdGhpcy5fZmlsZVN5c3RlbS5yZWFkZGlyU3luYyhmb2xkZXIpO1xuICAgICAgICBmb3IgKGxldCBkaXJJbm5lciBvZiBkaXJzKSB7XG4gICAgICAgICAgICBsZXQgYWN0dWFsUGF0aCA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCBzdGF0ID0gdGhpcy5fZmlsZVN5c3RlbS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCh0aGlzLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oYWN0dWFsUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmaWxlcyB3aXRoaW4gYSBzcGVjaWZpYyBmb2xkZXIgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIFBhdGggb2YgdGhlIGZvbGRlciB0byBnZXQgZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHRlbXBsYXRlRmlsZU5hbWVzIFRoZSB0ZW1wbGF0ZSBmaWxlIG5hbWVzXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlc1xuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbihmb2xkZXI6IHN0cmluZywgdGVtcGxhdGVGaWxlTmFtZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGRpcnMgPSB0aGlzLl9maWxlU3lzdGVtLnJlYWRkaXJTeW5jKGZvbGRlcik7XG4gICAgICAgIGZvciAobGV0IGRpcklubmVyIG9mIGRpcnMpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSB0aGlzLl9maWxlU3lzdGVtLnN0YXRTeW5jKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCh0aGlzLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oYWN0dWFsUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlRmlsZU5hbWVzLmluY2x1ZGVzKGZpbGVuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZm9sZGVycyBhbmQgZmlsZXMgd2l0aGluIGEgc3BlY2lmaWMgZm9sZGVyIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBQYXRoIG9mIHRoZSBmb2xkZXIgdG8gZ2V0IGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIGZpbGVzIGFuZCBmb2xkZXJzXG4gICAgICogQG1lbWJlcm9mIEZvbGRlcnNcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGZvbGRlcjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IGRpcnMgPSB0aGlzLl9maWxlU3lzdGVtLnJlYWRkaXJTeW5jKGZvbGRlcik7XG4gICAgICAgIGZvciAobGV0IGRpcklubmVyIG9mIGRpcnMpIHtcbiAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IHRoaXMuX2ZpbGVTeXN0ZW0uc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQodGhpcy5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gUGF0dGVybiBvZiBmaWxlcyB0byBsb29rIGZvclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKiBAbWVtYmVyb2YgRm9sZGVyc1xuICAgICAqL1xuICAgIHNlYXJjaEZvbGRlcihmb2xkZXI6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBsZXQgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBsZXQgZGlycyA9IHRoaXMuX2ZpbGVTeXN0ZW0ucmVhZGRpclN5bmMoZm9sZGVyKTtcbiAgICAgICAgZm9yIChsZXQgZGlySW5uZXIgb2YgZGlycykge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IHRoaXMuX2ZpbGVTeXN0ZW0uc3RhdFN5bmMoZGlySW5uZXIpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkgJiYgZGlySW5uZXIuZW5kc1dpdGgocGF0dGVybikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZGlySW5uZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHBhdHRlcm4gd2l0aGluIGEgZm9sZGVyIHdpdGggcmVnZXhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWd1bGFyRXhwIFRoZSByZWdleCBwYXR0ZXJuIG9mIGZpbGVzIHRvIGxvb2sgZm9yXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgc2VhcmNoRm9sZGVyUmVnZXgoZm9sZGVyOiBzdHJpbmcsIHJlZ3VsYXJFeHA6IFJlZ0V4cCk6IHN0cmluZ1tdIHtcbiAgICAgICAgZm9sZGVyID0gcGF0aC5ub3JtYWxpemUoZm9sZGVyKTtcbiAgICAgICAgdmFyIHJlc3VsdHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIFxuICAgICAgICBsZXQgZGlycyA9IHRoaXMuX2ZpbGVTeXN0ZW0ucmVhZGRpclN5bmMoZm9sZGVyKTtcbiAgICAgICAgZm9yIChsZXQgZGlySW5uZXIgb2YgZGlycykge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgcmVnZXhNYXRjaCA9IGRpcklubmVyLm1hdGNoKHJlZ3VsYXJFeHApO1xuICAgICAgICAgICAgdmFyIHN0YXQgPSB0aGlzLl9maWxlU3lzdGVtLnN0YXRTeW5jKGRpcklubmVyKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIHJlZ2V4TWF0Y2ggJiYgcmVnZXhNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlciwgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IFRoZSBwYXRocyBvZiB0aGUgbWF0Y2hpbmcgZmlsZXNcbiAgICAgKiBAbWVtYmVyb2YgRm9sZGVyc1xuICAgICAqL1xuICAgIHNlYXJjaFJlY3Vyc2l2ZShmb2xkZXI6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICB2YXIgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBsZXQgZGlycyA9IHRoaXMuX2ZpbGVTeXN0ZW0ucmVhZGRpclN5bmMoZm9sZGVyKTtcbiAgICAgICAgZm9yIChsZXQgZGlySW5uZXIgb2YgZGlycykge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IHRoaXMuX2ZpbGVTeXN0ZW0uc3RhdFN5bmMoZGlySW5uZXIpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCh0aGlzLnNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBhIHNwZWNpZmljIGZpbGUgd2l0aCByZWd1bGFyIGV4cHJlc3Npb24sIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWd1bGFyRXhwIFBhdHRlcm4gb2YgdGhlIGZpbGVzIHRvIGxvb2sgZm9yXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSB0aGUgcGF0aHMgb2YgdGhlIG1hdGNoaW5nIGZpbGVzXG4gICAgICogQG1lbWJlcm9mIEZvbGRlcnNcbiAgICAgKi9cbiAgICBzZWFyY2hSZWN1cnNpdmVSZWdleChmb2xkZXI6IHN0cmluZywgcmVndWxhckV4cDogUmVnRXhwIHwgc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlc3VsdHM6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgbGV0IGRpcnMgPSB0aGlzLl9maWxlU3lzdGVtLnJlYWRkaXJTeW5jKGZvbGRlcik7XG4gICAgICAgIGZvciAobGV0IGRpcklubmVyIG9mIGRpcnMpIHtcbiAgICAgICAgICAgIGRpcklubmVyID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgdmFyIHN0YXQgPSB0aGlzLl9maWxlU3lzdGVtLnN0YXRTeW5jKGRpcklubmVyKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQodGhpcy5zZWFyY2hSZWN1cnNpdmVSZWdleChkaXJJbm5lciwgcmVndWxhckV4cCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlZ2V4TWF0Y2ggPSBkaXJJbm5lci5tYXRjaChyZWd1bGFyRXhwKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIHJlZ2V4TWF0Y2ggJiYgcmVnZXhNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRocyBvZiB0aGUgbmVhcmVzdCBkaXJlY3RvcmllcyBtYXRjaGluZyB0aGUgcmVndWxhciBleHByZXNzaW9uLCBzZWFyY2hpbmcgdXB3YXJkc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgdGhlIHN0YXJ0IGZvbGRlclxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWd1bGFyRXhwXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBwYXRoc1xuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgZ2V0TmVhcmVzdERpcnNTZWFyY2hpbmdVcHdhcmRzKGZvbGRlcjogc3RyaW5nLCByZWd1bGFyRXhwOiBSZWdFeHApOiBzdHJpbmdbXSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLmlzTm90RW1wdHlGb2xkZXIoZm9sZGVyKSkge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSB0aGlzLmdldEZvbGRlcnNJblJlZ2V4KGZvbGRlciwgcmVndWxhckV4cCk7XG4gICAgICAgICAgICBpZiAoZm9sZGVycy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5mb2xkZXJzKTtcbiAgICAgICAgICAgIGZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsICcuLi8nKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdGggb2YgdGhlIG5lYXJlc3QgZmlsZSBtYXRjaGluZyB0aGUgcmVndWxhciBleHByZXNzaW9uLCBzZWFyY2hpbmcgdXB3YXJkc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgdGhlIHN0YXJ0IGZvbGRlclxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWd1bGFyRXhwXG4gICAgICogQHJldHVybnMge3N0cmluZ30gcGF0aFxuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzKGZvbGRlcjogc3RyaW5nLCByZWd1bGFyRXhwOiBSZWdFeHApOiBzdHJpbmcge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICB3aGlsZSAodGhpcy5pc05vdEVtcHR5Rm9sZGVyKGZvbGRlcikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5zZWFyY2hGb2xkZXJSZWdleChmb2xkZXIsIHJlZ3VsYXJFeHApOyBcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgICAgICAgZm9sZGVyID0gcGF0aC5qb2luKGZvbGRlciwgJy4uLycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIGZvbGRlciBhdCBwYXRoICdmb2xkZXInIGlzIGVtcHR5IG9yIG5vdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBtZW1iZXJvZiBGb2xkZXJzXG4gICAgICovXG4gICAgaXNOb3RFbXB0eUZvbGRlcihmb2xkZXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZm9sZGVyICE9PSBudWxsICYmIGZvbGRlciAhPT0gJycgJiYgZm9sZGVyICE9PSBwYXRoLnNlcDsgXG4gICAgfVxuICAgIFxufVxuIl19