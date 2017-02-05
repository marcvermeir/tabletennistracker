/* OBSOLETE */

/*
app.factory('ModelBuilder', function() {
    'use strict';
    return {
        //
        // * For each item, iterates over config objects keys, 
        // * invoking function, passing record and assigning 
        // * returned value to model key. 
        // * @param configObj - config object (e.g. categories)
        // * @returns refined list of model objects
        //
        buildModelList: function(list, configObj) {
            var modelList = [];
            angular.forEach(list, function(item) {
                var model = {},
                    key;

                for (key in configObj) {
                    if (configObj.hasOwnProperty(key) && typeof configObj[key] === 'function') {
                        model[key] = configObj[key](item);
                    }
                }

                modelList.push(model);
            });

            return modelList;
        }
    }
});
*/
