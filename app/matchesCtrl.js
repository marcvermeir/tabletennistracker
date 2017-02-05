app.controller("matchesCtrl", function ($scope, $modal, $filter, $location, sharedService) {

  $scope.initialize = function () {

    $scope.criteria = sharedService.getCriteria();
  };

  $scope.initialize();

});   
