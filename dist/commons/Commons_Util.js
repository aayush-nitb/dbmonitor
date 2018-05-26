"use strict";
var _ = require('underscore');
var Commons_Util = (function () {
    function Commons_Util() {
    }
    Commons_Util.all = function (strings, delimeter) {
        var union = [];
        if (_.isUndefined(delimeter)) {
            delimeter = ',';
        }
        for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
            var string = strings_1[_i];
            if (!_.isEmpty(string)) {
                union = _.union(union, string.split(delimeter));
            }
        }
        return _.compact(union);
    };
    return Commons_Util;
}());
exports.Commons_Util = Commons_Util;

//# sourceMappingURL=Commons_Util.js.map
