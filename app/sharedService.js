app.factory("sharedService", function() {

    var sharedData = [ { } ];

    return {
        setCriteria: function(criteria) {
            sharedData.criteria = criteria;
        },
        getCriteria: function() {
            return sharedData.criteria;
        }
    };
});