var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.constant('VTTLAPI', {
    'URL': 'http://api.vttl.be/0.7/index.php?s=vttl',
    'WSDL': 'http://api.vttl.be/0.7/?wsdl',
    'NAMESPACEURL': 'http://api.frenoy.net/TabTAPI'
});
app.constant('ENVIRONMENT', { 'DEBUG': true });

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'Criteria',
                templateUrl: 'partials/criteria.html',
                controller: 'criteriaCtrl'
            })
            .when('/matches', {
                title: 'Matches',
                templateUrl: 'partials/matches.html',
                controller: 'matchesCtrl'
            })
            .when('/game', {
                title: 'Game',
                templateUrl: 'partials/game.html',
                controller: 'gameCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
