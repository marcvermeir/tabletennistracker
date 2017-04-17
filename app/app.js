var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.constant('VTTLAPI', {
    'URL': 'http://api.vttl.be/0.7/index.php?s=vttl',
    'WSDL': 'http://api.vttl.be/0.7/?wsdl',
    'NAMESPACEURL': 'http://api.frenoy.net/TabTAPI'
});
app.constant('ENVIRONMENT', { 'DEBUG': false });
app.constant('PRODUCT', { 'VERSION': '1.0.0' });

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'Search',
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
