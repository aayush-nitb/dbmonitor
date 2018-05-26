let _ = require('underscore');

export abstract class Commons_Util {
    static all(strings: string[], delimeter?: string) {
        let union = [];
        if (_.isUndefined(delimeter)) {
            delimeter = ',';
        }
        for (let string of strings) {
            if (!_.isEmpty(string)) {
                union = _.union(union, string.split(delimeter));
            }
        }
        return _.compact(union);
    }
}