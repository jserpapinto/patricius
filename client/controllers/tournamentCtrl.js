var App = angular.module('App');

App.controller('tournamentCtrl',['$scope', '$http' , function($scope, $http) {

	$scope.rowCollection = [];
	
	var tournaments = {
		tournament : {
			name: "",
			type: "",
			date: ""
		}
	};
	
	// Get all tournaments //
	$http.get("http://192.168.1.66:3000/backoffice/tournaments").success(function( data ) {
		$scope.rowCollection = data;
	});	

	// Add new tournament //
	$scope.addRow = function(){
		tournaments.tournament.name = this.name;
		tournaments.tournament.type = this.type;
		tournaments.tournament.date = this.date;

		$http.post("http://192.168.1.66:3000/backoffice/tournament", tournaments).success(function(data, status){
			$scope.rowCollection.push({ 'name': tournaments.tournament.name	,'type': tournaments.tournament.type, 'date' : tournaments.tournament.date });
		}).error(function(){
			console.log("herro"); // TODO: slice rowCollection
		})	
	}

	$scope.removeRow = function(){
		var id = this.row.id;
		$http.delete("http://192.168.1.66:3000/backoffice/tournament/"+id).success(function(status){
			console.log(status); // TODO: slice rowCollection
		}).error(function(err){
			console.log(err); // TODO: Error message
		})
	} 



}]);


