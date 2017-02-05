/* OBSOLETE */

/*
// *
// * Defines a category model object. Converts long JSON properties 
// * into concise keys for model objects. They prevent pushing long 
// * JSON properties into View.
// *
app.factory('TeamConfig', function() {
    'use strict';
    return {
        value: function (record) {
            return 'val';
        },

        label: function (record) {
            return 'el';
        },

        url: function(record) {
            return 'store' + record.properties['seoUrl'][0];
        },
        imagePath: function(record) {
            return '//store.bbcomcdn.com/' +
                record.properties['category.largeImage'][0];
        },
        title: function(record) {
            return record.label;
        },
        description: function(record) {
            return record.properties["description.en_US"][0];
        },
        buttonText: function(record) {
            return record.properties.parentDimension;
        }
    };
});
*/