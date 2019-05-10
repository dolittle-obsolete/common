/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
export { Guid };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpZC5qcyIsInNvdXJjZVJvb3QiOiIuL1NvdXJjZS8iLCJzb3VyY2VzIjpbIkd1aWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnR0FHZ0c7QUFFaEc7Ozs7O0dBS0c7QUFDSDtJQUFBO0lBNEJBLENBQUM7SUFsQkcsc0JBQVcsYUFBSztRQVJoQjs7Ozs7OztXQU9HO2FBQ0g7WUFDSSxPQUFPLHNDQUFzQyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksV0FBTSxHQUFiO1FBQ0ksSUFBSSxFQUFFLEdBQUc7WUFDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQztRQUNGLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnbG9iYWxseSB1bmlxdWUgaWRlbnRpZmllclxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBHdWlkXG4gKi9cbmV4cG9ydCBjbGFzcyBHdWlkIHtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZW1wdHkgcmVwcmVzZW50YXRpb24gb2YgYSB7R3VpZH1cbiAgICAgKlxuICAgICAqIEByZWFkb25seSBcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAbWVtYmVyb2YgR3VpZFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgZW1wdHkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB7R3VpZH0gYXMge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2Yge0d1aWR9XG4gICAgICogQG1lbWJlcm9mIEd1aWRcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBTNCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKSB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBndWlkID0gKFM0KCkgKyBTNCgpICsgJy0nICsgUzQoKSArICctJyArIFM0KCkgKyAnLScgKyBTNCgpICsgJy0nICsgUzQoKSArIFM0KCkgKyBTNCgpKTtcbiAgICAgICAgcmV0dXJuIGd1aWQ7XG4gICAgfVxufVxuIl19