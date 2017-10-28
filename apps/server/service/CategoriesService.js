'use strict';


/**
 * Get all categories
 * Get all categories
 *
 * returns List
 **/
exports.getCategories = function() {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = "Code we changed :)";
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}