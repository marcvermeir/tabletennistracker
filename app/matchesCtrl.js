app.controller("matchesCtrl", function($scope, $modal, $filter, $location, VTTLAPI, sharedService, ENVIRONMENT) {

//todo: show the selected team in bold in both grids: matches && ranking
//todo: show the matches (list) as hyperlinks to the game (detail) view

    $scope.orderRanking = function(item){
      return parseInt(item.position);
    };

    $scope.home = function() {

        sharedService.setCriteria(null);
        $location.path('/');
    };

    $scope.game = function(match) {
        
        $scope.criteria.selectedGame = match.matchid;
        sharedService.setCriteria($scope.criteria);
        $location.path('/game');
    };

    $scope.fetchMatches = function(divisionId, season, weekName) {
        'use strict';

        var year2Day = $filter('date')(new Date(), 'yyyy');
        var yearDateFrom = year2Day + '0101';
        var yearDateTo = year2Day + '1231';

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
                YearDateFrom: yearDateFrom,
                YearDateTo: yearDateTo
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
                $scope.$apply();

            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
            }
        });
    };

    $scope.fetchRanking = function(divisionId, weekName) {
        'use strict';

        $.soap({
            url: VTTLAPI.URL,
            type: 'POST',
            method: 'GetDivisionRankingRequest',
            namespaceQualifier: '',
            namespaceURL: VTTLAPI.NAMESPACEURL,
            noPrefix: true,
            elementName: 'GetDivisionRankingRequest',
            appendMethodToURL: false,
            soap12: false,
            context: document.body,
            data: {
                DivisionId: divisionId,
                WeekName: weekName
            },
            success: function(SOAPResponse) {
                var result = [];
                var json = SOAPResponse.toJSON();
                if (json) {
                    // .. var count = parseInt(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetDivisionRankingResponse']['ns1:MatchCount']);
                    var entries = json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetDivisionRankingResponse']['ns1:RankingEntries'];

                    if (entries) {
                        result = entries.map(function(entry) {
                            var po = entry['ns1:Position'];
                            var tm = entry['ns1:Team'].trim();
                            var pt = entry['ns1:Points'];
                            
                            return { 'position': po, 'team': tm, 'points': pt };
                        });
                    };
                };

                $scope.ranking = result;
                $scope.$apply();

            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
            }
        });
    };

    $scope.initialize = function() {

        $scope.criteria = sharedService.getCriteria();

        $scope.matches = {};
        $scope.ranking = {};

        $scope.fetchMatches($scope.criteria.selectedDivision, $scope.criteria.season, $scope.criteria.selectedWeek);
        $scope.fetchRanking($scope.criteria.selectedDivision, $scope.criteria.selectedWeek);
    };

    $scope.initialize();
});
