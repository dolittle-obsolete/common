import Conf from 'conf';
/**
 * Represents a config file that's used as a cache storage for the tooling.
 *
 * The configuration file should be stored at the root of the scope folder of the running tooling package.
 *
 * @export
 * @class CacheConfig
 * @extends {Conf}
 */
export declare class CacheConfig extends Conf {
    /**
     * Creates an instance of {CacheConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {string} nodeModulesFolder The path of the global node_modules folder
     * @param {{[key: string]: any}} defaultObj
     * @memberof CacheConfig
     */
    constructor(configName: string, nodeModulesFolder: string, defaultObj: {
        [key: string]: any;
    });
}
