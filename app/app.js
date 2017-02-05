var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.constant('VTTLAPI', { 'URL' : 'https://api.vttl.be/0.7/index.php?s=vttl', 
                          'WSDL' : 'http://api.vttl.be/0.7/?wsdl', 
                          'NAMESPACEURL' :'https://api.frenoy.net/TabTAPI' });

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      title: 'Criteria', 
      templateUrl: 'criteria.html',
      controller: 'criteriaCtrl'
    })
    .when('/matches', {
      title: 'Matches',
      templateUrl: 'matches.html',
      controller: 'matchesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    