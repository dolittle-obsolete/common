/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ClusterConfig } from './ClusterConfig';
import path from 'path';
var centralFolder = '~/.dolittle';
var configFile = 'config.json';
/**
 * Expand the given file paths possible reference to home folder
 * @param {string} filePath
 */
function expandPath(filePath) {
    if (filePath[0] === '~') {
        return path.join(process.env.HOME || process.env.HOMEPATH || '', filePath.slice(1));
    }
    return filePath;
}
/**
 * Represents a manager for dealing with configurations
 *
 * @export
 * @class ConfigManager
 */
var ConfigManager = /** @class */ (function () {
    /**
     * Initializes a new instance of {ConfigManager}
     * @param {typeof FsExtra)} fileSystem
     * @param {ConfigParser} configParser
     * @param {WinstonLogger} logger
     */
    function ConfigManager(fileSystem, logger) {
        this._isFirstRun = false;
        this._fileSystem = fileSystem;
        this._logger = logger;
        this.centralFolderLocation = expandPath(centralFolder);
        this.makeSureFolderExists();
    }
    Object.defineProperty(ConfigManager.prototype, "configFileLocation", {
        /**
         * Gets the location of the config file
         * @returns {string} The path to the config file
         */
        get: function () {
            return path.join(this.centralFolderLocation, configFile);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManager.prototype, "isFirstRun", {
        /**
         * Gets whether or not this is a first run of the dolittle tool
         * @returns {boolean} True if it is, false if not
         */
        get: function () { return this._isFirstRun; },
        enumerable: true,
        configurable: true
    });
    /**
     * Make sure the central folder exists
     */
    ConfigManager.prototype.makeSureFolderExists = function () {
        if (!this._fileSystem.existsSync(this.centralFolderLocation)) {
            this._isFirstRun = true;
            this._logger.info('Central Dolittle folder does not exist - creating it and setting up default configuration');
            try {
                this._fileSystem.ensureDirSync(this.centralFolderLocation);
            }
            catch (err) {
                try {
                    var shell = require('shelljs');
                    shell.mkdir('-p', this.centralFolderLocation);
                }
                catch (err) {
                    this._logger.error('Could not create .dolittle folder at root: ', err);
                    this._logger.info('Try creating this directory manually: ', this.centralFolderLocation);
                    throw new Error('Could not create .dolittle directory');
                }
            }
            var config = new ClusterConfig();
            this._fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
        }
        else {
            this._isFirstRun = false;
        }
    };
    return ConfigManager;
}());
export { ConfigManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbIkNvbmZpZ01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnR0FHZ0c7QUFDaEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUl4QixJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDcEMsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDO0FBRWpDOzs7R0FHRztBQUNILFNBQVMsVUFBVSxDQUFDLFFBQWdCO0lBQ2hDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2RjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNIO0lBS0k7Ozs7O09BS0c7SUFDSCx1QkFBWSxVQUEwQixFQUFFLE1BQXFCO1FBUnJELGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBU3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFFaEMsQ0FBQztJQVdELHNCQUFJLDZDQUFrQjtRQUp0Qjs7O1dBR0c7YUFDSDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0QsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxxQ0FBVTtRQUpkOzs7V0FHRzthQUNILGNBQTJCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7OztPQUFBO0lBRXBEOztPQUVHO0lBQ0ssNENBQW9CLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDJGQUEyRixDQUFDLENBQUM7WUFDL0csSUFBSTtnQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtZQUFDLE9BQU0sR0FBRyxFQUNYO2dCQUNJLElBQUk7b0JBQ0EsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztpQkFFakQ7Z0JBQUMsT0FBTSxHQUFHLEVBQ1g7b0JBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3ZFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUN4RixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7aUJBQzNEO2FBQ0o7WUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDL0U7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQW5FRCxJQW1FQyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7Q2x1c3RlckNvbmZpZ30gZnJvbSAnLi9DbHVzdGVyQ29uZmlnJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgRnNFeHRyYSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQge0xvZ2dlciBhcyBXaW5zdG9uTG9nZ2VyfSBmcm9tICd3aW5zdG9uJztcblxuY29uc3QgY2VudHJhbEZvbGRlciA9ICd+Ly5kb2xpdHRsZSc7XG5jb25zdCBjb25maWdGaWxlID0gJ2NvbmZpZy5qc29uJztcblxuLyoqXG4gKiBFeHBhbmQgdGhlIGdpdmVuIGZpbGUgcGF0aHMgcG9zc2libGUgcmVmZXJlbmNlIHRvIGhvbWUgZm9sZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZFBhdGgoZmlsZVBhdGg6IHN0cmluZykge1xuICAgIGlmIChmaWxlUGF0aFswXSA9PT0gJ34nKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuSE9NRSB8fCBwcm9jZXNzLmVudi5IT01FUEFUSCB8fCAnJywgZmlsZVBhdGguc2xpY2UoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZVBhdGg7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGRlYWxpbmcgd2l0aCBjb25maWd1cmF0aW9uc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDb25maWdNYW5hZ2VyXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdNYW5hZ2VyIHtcbiAgICBwcml2YXRlIF9maWxlU3lzdGVtOiB0eXBlb2YgRnNFeHRyYTtcbiAgICBwcml2YXRlIF9sb2dnZXI6IFdpbnN0b25Mb2dnZXI7XG4gICAgcHJpdmF0ZSBfaXNGaXJzdFJ1biA9IGZhbHNlO1xuICAgIFxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtDb25maWdNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7dHlwZW9mIEZzRXh0cmEpfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtDb25maWdQYXJzZXJ9IGNvbmZpZ1BhcnNlclxuICAgICAqIEBwYXJhbSB7V2luc3RvbkxvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZmlsZVN5c3RlbTogdHlwZW9mIEZzRXh0cmEsIGxvZ2dlcjogV2luc3RvbkxvZ2dlcikge1xuICAgICAgICB0aGlzLl9maWxlU3lzdGVtID0gZmlsZVN5c3RlbTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyOyAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiA9IGV4cGFuZFBhdGgoY2VudHJhbEZvbGRlcik7XG4gICAgICAgIHRoaXMubWFrZVN1cmVGb2xkZXJFeGlzdHMoKTtcbiAgICAgICAgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNlbnRyYWwgZm9sZGVyIGxvY2F0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGNlbnRyYWwgZm9sZGVyXG4gICAgICovXG4gICAgcmVhZG9ubHkgY2VudHJhbEZvbGRlckxvY2F0aW9uOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgY29uZmlnRmlsZUxvY2F0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4odGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGNvbmZpZ0ZpbGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciBvciBub3QgdGhpcyBpcyBhIGZpcnN0IHJ1biBvZiB0aGUgZG9saXR0bGUgdG9vbFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGl0IGlzLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICBnZXQgaXNGaXJzdFJ1bigpOiBib29sZWFuIHtyZXR1cm4gdGhpcy5faXNGaXJzdFJ1bjt9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgdGhlIGNlbnRyYWwgZm9sZGVyIGV4aXN0c1xuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZVN1cmVGb2xkZXJFeGlzdHMoKSB7XG4gICAgICAgIGlmKCAhdGhpcy5fZmlsZVN5c3RlbS5leGlzdHNTeW5jKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5faXNGaXJzdFJ1biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbygnQ2VudHJhbCBEb2xpdHRsZSBmb2xkZXIgZG9lcyBub3QgZXhpc3QgLSBjcmVhdGluZyBpdCBhbmQgc2V0dGluZyB1cCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24nKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsZVN5c3RlbS5lbnN1cmVEaXJTeW5jKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGVsbCA9IHJlcXVpcmUoJ3NoZWxsanMnKTtcbiAgICAgICAgICAgICAgICAgICAgc2hlbGwubWtkaXIoJy1wJywgdGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGVycilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcignQ291bGQgbm90IGNyZWF0ZSAuZG9saXR0bGUgZm9sZGVyIGF0IHJvb3Q6ICcsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdUcnkgY3JlYXRpbmcgdGhpcyBkaXJlY3RvcnkgbWFudWFsbHk6ICcsIHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgY3JlYXRlIC5kb2xpdHRsZSBkaXJlY3RvcnknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENsdXN0ZXJDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGVTeXN0ZW0ud3JpdGVGaWxlKHRoaXMuY29uZmlnRmlsZUxvY2F0aW9uLCBKU09OLnN0cmluZ2lmeShjb25maWcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RSdW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=