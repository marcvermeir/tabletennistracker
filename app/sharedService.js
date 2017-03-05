app.factory("sharedService", function() {

    var sharedData = [ { } ];

    return {
        setCriteria: function(criteria) {
            sharedData.criteria = criteria;
        },
        getCriteria: function() {
            if (sharedData.criteria)
              return sharedData.criteria;
            else
              //todo: get 'season' from configuration ?!
              return { season: '17', selectedTeam: '', selectedDivision: '', selectedWeek: '' };
        }
    };
});