
app.controller("menuCtrl", function($scope, $location) {

	$scope.clicked = function() {
		return false;
	};

  	$scope.menuClass = function(page) {
    	var current = $location.path();
    	return page === current ? "blog-nav-item active" : "blog-nav-item";
  	};
});