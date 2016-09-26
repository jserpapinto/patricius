var App = angular.module('App');

App.controller('singleTournamentCtrl',['$scope', '$http' ,'$routeParams', function($scope, $http, $routeParams) {
	console.log($scope);
	// Get all tournaments //
	var id = $routeParams.id;
	$http.get("http://127.0.0.1:3000/backoffice/tournament/"+id).success(function( data ) {
		console.log(data);
		$scope.rowCollection = data;
	});	






}]);


