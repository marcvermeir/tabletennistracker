app.controller("criteriaCtrl", function($scope, $modal, $filter, $location, VTTLAPI, sharedService, PRODUCT) {

    $scope.go = function() {

        var selectedDivisionName = $scope.ttdivisions.filter(function(item) {
            return item.value === $scope.criteria.selectedDivision;
        })[0].name;

        //todo; get the selecred Team Name :
        /*
        var selectedTeamName = $scope.ttteams.filter(function(item) {
            return item.value === $scope.criteria.selectedTeam;
        })[0].name;
        */

        $scope.criteria.selectedDivisionName = selectedDivisionName;
        sharedService.setCriteria($scope.criteria);

        $location.path('/matches');
    };

    $scope.invalidCriteria = function() {
        return isEmpty($scope.criteria.selectedTeam) ||
                isEmpty($scope.criteria.selectedDivision) ||
                isEmpty($scope.criteria.selectedWeek);
    };

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    $scope.fetchTeams = function(season) {
        'use strict';

        $.soap({
            url: VTTLAPI.URL,
            type: 'POST',
            method: 'GetClubs',
            namespaceQualifier: '',
            namespaceURL: VTTLAPI.NAMESPACEURL,
            noPrefix: true,
            elementName: 'GetClubs',
            appendMethodToURL: false,
            soap12: false,
            context: document.body,
            data: {
                Season: season,
            },
            success: function(SOAPResponse) {
                var result = [];
                var json = SOAPResponse.toJSON();
                if (json) {
                    var count = parseInt(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetClubsResponse']['ns1:ClubCount']);
                    var entries = json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetClubsResponse']['ns1:ClubEntries'];

                    if (entries) {
                        result = entries.map(function(entry) {
                            var ui = entry['ns1:UniqueIndex'];
                            var ln = entry['ns1:LongName'];
                            return { 'value': ui, 'label': ui + ' - ' + ln };
                        });
                    };
                };

                $scope.ttteams = result;
                $scope.$apply();
            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
            }
        });
    };

    $scope.fetchDivisions = function(season) {
        'use strict';

        $.soap({
            url: VTTLAPI.URL,
            type: 'POST',
            method: 'GetDivisions',
            namespaceQualifier: '',
            namespaceURL: VTTLAPI.NAMESPACEURL,
            noPrefix: true,
            elementName: 'GetDivisions',
            appendMethodToURL: false,
            soap12: false,
            context: document.body,
            data: {
                Season: season,
            },
            success: function(SOAPResponse) {
                var result = [];
                var json = SOAPResponse.toJSON();
                if (json) {
                    var count = parseInt(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetDivisionsResponse']['ns1:DivisionCount']);
                    var entries = json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetDivisionsResponse']['ns1:DivisionEntries'];

                    if (entries) {
                        result = entries.map(function(entry) {
                            var di = entry['ns1:DivisionId'];
                            var dn = entry['ns1:DivisionName'];
                            return { 'value': di, 'label': dn };
                        });
                    };
                };

                $scope.ttdivisions = result;
                $scope.$apply();
            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
            }
        });
    };

    $scope.fetchClubTeams = function(clubId, season) {
        'use strict';

        $.soap({
            url: VTTLAPI.URL,
            type: 'POST',
            method: 'GetClubTeamsRequest',
            namespaceQualifier: '',
            namespaceURL: VTTLAPI.NAMESPACEURL,
            noPrefix: true,
            elementName: 'GetClubTeamsRequest',
            appendMethodToURL: false,
            soap12: false,
            context: document.body,
            data: {
                Club: clubId,
            },
            success: function(SOAPResponse) {
                var result = [];
                var json = SOAPResponse.toJSON();
                if (json) {
                    var count = parseInt(json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetClubTeamsResponse']['ns1:TeamCount']);
                    var entries = json['#document']['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:GetClubTeamsResponse']['ns1:TeamEntries'];

                    if (entries) {
                        result = entries.map(function(entry) {
                            var ti = entry['ns1:Team'];
                            var di = entry['ns1:DivisionId'];
                            var dn = entry['ns1:DivisionName'];
                            //// var t = entry['ns1:Team'];
                            return { 'value': di, 'label': 'Ploeg ' + ti + ' - ' + dn, 'name': dn };
                        });
                    };
                };

                if (result.length == 0) {
                    $scope.fetchDivisions(season);
                }
                else {    
                    $scope.ttdivisions = result;
                    $scope.$apply();
                }
            },
            error: function(SOAPResponse) {
                //TODO: implement error handling ..
            }
        });
    };

    $scope.fetchWeeks = function() {

        var ttweeks = [
            { value: "1", label: "Week 1" },
            { value: "2", label: "Week 2" },
            { value: "3", label: "Week 3" },
            { value: "4", label: "Week 4" },
            { value: "5", label: "Week 5" },
            { value: "6", label: "Week 6" },
            { value: "7", label: "Week 7" },
            { value: "8", label: "Week 8" },
            { value: "9", label: "Week 9" },
            { value: "10", label: "Week 10" },
            { value: "11", label: "Week 11" },
            { value: "12", label: "Week 12" },
            { value: "13", label: "Week 13" },
            { value: "14", label: "Week 14" },
            { value: "15", label: "Week 15" },
            { value: "16", label: "Week 16" },
            { value: "17", label: "Week 17" },
            { value: "18", label: "Week 18" },
            { value: "19", label: "Week 19" },
            { value: "20", label: "Week 20" },
            { value: "21", label: "Week 21" },
            { value: "22", label: "Week 22" },
        ];

        $scope.ttweeks = ttweeks;
    };

    $scope.teamChanged = function() {
        var selectedTeam = $scope.criteria.selectedTeam;
        if (selectedTeam) {
            $scope.fetchClubTeams(selectedTeam, $scope.criteria.season);
            /*
            if ($scope.ttdivisions.length == 0) {
                $scope.fetchDivisions($scope.criteria.season);
            }
            */
        } else
            $scope.fetchDivisions($scope.criteria.season);
    };

    $scope.initialize = function() {

        sharedService.setCriteria(null);
        $scope.criteria = sharedService.getCriteria();

        $scope.ttweeks = {};
        $scope.ttteams = {};
        $scope.ttdivisions = {};

        $scope.fetchDivisions($scope.criteria.season);
        $scope.fetchTeams($scope.criteria.season);
        $scope.fetchWeeks();

        //todo: preselect the 3 comboboxes with the saved state ?!

    };

    $scope.initialize();
});
