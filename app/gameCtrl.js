app.controller("gameCtrl", function($scope, $modal, $filter, $location, VTTLAPI, sharedService, ENVIRONMENT) {

    $scope.home = function() {

        sharedService.setCriteria(null);
        $location.path('/');
    };

    $scope.back = function() {

        sharedService.setCriteria($scope.criteria);
        $location.path('/matches');
    };

    $scope.fetchGame = function(divisionId, season, weekName, gameId) {
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
                YearDateTo: yearDateTo,
                WithDetails: 'yes',
                MatchId: gameId
            },
            success: function(SOAPResponse) {
                var result = [];
                var json = SOAPResponse.toJSON();
                if (json) {
                    var count = parseInt(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetMatchesResponse']['ns1:MatchCount']);
                    var entries = [];
                    entries.push(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetMatchesResponse']['ns1:TeamMatchesEntries']);

                    if (entries) {
                        result = entries.map(function(entry) {
                            var mi = entry['ns1:MatchId'];
                            var dt = entry['ns1:Date'];
                            var ht = entry['ns1:HomeTeam'];
                            var at = entry['ns1:AwayTeam'];
                            var sc = entry['ns1:Score'];

                            var matches = [];
                            var matchDetails = entry['ns1:MatchDetails'];

                            var homePlayers = matchDetails['ns1:HomePlayers']['ns1:Players'];
                            var awayPlayers = matchDetails['ns1:AwayPlayers']['ns1:Players'];
                            var individualMatchResults = matchDetails['ns1:IndividualMatchResults'];

                            
                            homePlayers = homePlayers.map(function(homePlayer) {
                                return { 'uidx': homePlayer['ns1:UniqueIndex'], 
                                         'name': homePlayer['ns1:LastName'] + ' ' + homePlayer['ns1:FirstName'], 
                                         'ranking': homePlayer['ns1:Ranking'] };
                            });

                            awayPlayers = awayPlayers.map(function(awayPlayer) {
                                return { 'uidx': awayPlayer['ns1:UniqueIndex'], 
                                         'name': awayPlayer['ns1:LastName'] + ' ' + awayPlayer['ns1:FirstName'], 
                                         'ranking': awayPlayer['ns1:Ranking'] };
                            });

                            matches = individualMatchResults.map(function(individualMatchResult) {
                                return { 'position': individualMatchResult['ns1:Position'], 
                                         'homeplayer': individualMatchResult['ns1:HomePlayerUniqueIndex'], 
                                         'homeranking': '', 
                                         'awayplayer': individualMatchResult['ns1:AwayPlayerUniqueIndex'], 
                                         'awayranking': '', 
                                         'score': ''.concat(individualMatchResult['ns1:HomeSetCount'], '-', individualMatchResult['ns1:AwaySetCount']) };

                            });

                            matches = matches.map(function(match) {
                                var result = angular.copy(match);

                                // for each match : get the homeplayer details and return these as 'lastname + firstname' and ranking :
                                var hpUIdx = result.homeplayer;
                                var hp = $filter('filter')(homePlayers, {uidx: hpUIdx})[0];

                                result.homeplayer = hp.name;
                                result.homeranking = hp.ranking;

                                // for each match : get the awayplayer details and return these as 'lastname + firstname' and ranking :
                                var apUIdx = result.awayplayer;
                                var ap = $filter('filter')(awayPlayers, {uidx: apUIdx})[0];

                                result.awayplayer = ap.name;
                                result.awayranking = ap.ranking;

                                return result;

                            });

                            return { 'matchid': mi, 'date': dt, 'hometeam': ht, 'awayteam': at, 'score': sc, 'matches': matches };
                        });
                    };
                };

                $scope.games = result;
                $scope.$apply();

            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
            }
        });
    };

    $scope.initialize = function() {

        $scope.criteria = sharedService.getCriteria();

        $scope.games = {};

        $scope.fetchGame($scope.criteria.selectedDivision, $scope.criteria.season, $scope.criteria.selectedWeek, $scope.criteria.selectedGame);
    };

    $scope.initialize();
});
