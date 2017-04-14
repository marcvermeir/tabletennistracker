app.factory("sharedService", function($filter) {

    var sharedData = [ { } ];

    //todo: save/persist the criteria into isolated storage ?!

    return {
        setCriteria: function(criteria) {
            sharedData.criteria = criteria;
        },
        getCriteria: function() {
            if (sharedData.criteria)
              return sharedData.criteria;
            else {

              // extracts the '17' from (current) year 2017 :
              var year2Day = $filter('date')(new Date(), 'yyyy').slice(-2);

              return { season: year2Day, selectedTeam: '', selectedDivision: '', selectedWeek: '', selectedGame: '', selectedDivisionName: '' };
            }
        }
    };
});