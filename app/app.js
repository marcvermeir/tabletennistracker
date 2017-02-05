var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.constant('VTTLAPI', { 'URL' : 'http://api.vttl.be/0.7/index.php?s=vttl', 
                          'WSDL' : 'http://api.vttl.be/0.7/?wsdl', 
                          'NAMESPACEURL' :'http://api.frenoy.net/TabTAPI' });

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      title: 'Criteria', 
      templateUrl: 'partials/Criteria.html',
      controller: 'criteriaCtrl'
    })
    .when('/matches', {
      title: 'Matches',
      templateUrl: 'partials/Matches.html',
      controller: 'matchesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    