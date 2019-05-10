"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a globally unique identifier
 *
 * @export
 * @class Guid
 */
var Guid = /** @class */ (function () {
    function Guid() {
    }
    Object.defineProperty(Guid, "empty", {
        /**
         * Get the empty representation of a {Guid}
         *
         * @readonly
         * @static
         * @returns {string}
         * @memberof Guid
         */
        get: function () {
            return '00000000-0000-0000-0000-000000000000';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Create a new {Guid} as {string}
     *
     * @static
     * @returns {string} String representation of {Guid}
     * @memberof Guid
     */
    Guid.create = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        var guid = (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
        return guid;
    };
    return Guid;
}());
exports.Guid = Guid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpZC5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbIkd1aWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Z0dBR2dHOztBQUVoRzs7Ozs7R0FLRztBQUNIO0lBQUE7SUE0QkEsQ0FBQztJQWxCRyxzQkFBVyxhQUFLO1FBUmhCOzs7Ozs7O1dBT0c7YUFDSDtZQUNJLE9BQU8sc0NBQXNDLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7O09BTUc7SUFDSSxXQUFNLEdBQWI7UUFDSSxJQUFJLEVBQUUsR0FBRztZQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1Qlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEd1aWRcbiAqL1xuZXhwb3J0IGNsYXNzIEd1aWQge1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlbXB0eSByZXByZXNlbnRhdGlvbiBvZiBhIHtHdWlkfVxuICAgICAqXG4gICAgICogQHJlYWRvbmx5IFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBHdWlkXG4gICAgICovXG4gICAgc3RhdGljIGdldCBlbXB0eSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHtHdWlkfSBhcyB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB7R3VpZH1cbiAgICAgKiBAbWVtYmVyb2YgR3VpZFxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IFM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGd1aWQgPSAoUzQoKSArIFM0KCkgKyAnLScgKyBTNCgpICsgJy0nICsgUzQoKSArICctJyArIFM0KCkgKyAnLScgKyBTNCgpICsgUzQoKSArIFM0KCkpO1xuICAgICAgICByZXR1cm4gZ3VpZDtcbiAgICB9XG59XG4iXX0=