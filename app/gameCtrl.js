app.controller("gameCtrl", function($scope, $modal, $filter, $location, VTTLAPI, sharedService) {

    $scope.fetchGame = function(divisionId, season, weekName, gameId) {
        'use strict';

        $.soap({
            url: VTTLAPI.URL,
            type: 'POST',
            method: 'GetMatchesRequest',
            namespaceQualifier: '',
            namespaceURL: VTTLAPI.NAMESPACEURL,
            noPrefix: true,
            elementName: 'GetMatchesRequest',
            appendMethodToURL: false,
            soap12: false,
            context: document.body,
            data: {
                DivisionId: divisionId,
                Season: season,
                WeekName: weekName,
                //todo: derive both dates from the passed season :
                YearDateFrom: '20170101',
                YearDateTo: '20171231',
                WithDetails: 'yes',
                MatchId: gameId
            },
            success: function(SOAPResponse) {
                var result = [];
                var json = SOAPResponse.toJSON();
                if (json) {
                    var count = parseInt(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetMatchesResponse']['ns1:MatchCount']);
                    var entries = json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetMatchesResponse']['ns1:TeamMatchesEntries'];

                    if (entries) {
                        result = entries.map(function(entry) {
                            var mi = entry['ns1:MatchId'];
                            var dt = entry['ns1:Date'];
                            var ht = entry['ns1:HomeTeam'];
                            var at = entry['ns1:AwayTeam'];
                            var sc = entry['ns1:Score'];

                            return { 'matchid': mi, 'date': dt, 'hometeam': ht, 'awayteam': at, 'score': sc };
                        });
                    };
                };

                $scope.matches = result;

            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
                alert(SOAPResponse);

            }
        });
    };

    $scope.initialize = function() {

        $scope.criteria = sharedService.getCriteria();

        $scope.game = {};

        $scope.fetchGame($scope.criteria.selectedDivision, $scope.criteria.season, $scope.criteria.selectedWeek, $scope.criteria.selectedGame);
    };

    $scope.initialize();

    //todo: remove the following :
    // alert($scope.criteria.season + '/' + $scope.criteria.selectedTeam + '/' + $scope.criteria.selectedDivision + '/' + $scope.criteria.selectedWeek);

});
