var App = angular.module('App');

App.controller('playersCtrl',['$scope', '$http' , function($scope, $http) {

	$scope.rowCollection = [];
	
	var players = {
		player : {
			id: "",
			name: "",
			date: "",
			image: ""
		}
	};
	
	$http.get("http://127.0.0.1:3000/backoffice/players").success(function( data ) {
		$scope.rowCollection = data;
	});	

	// Add new tournament //
	$scope.addRow = function(){
		players.player.name = this.name;
		players.player.type = this.type;
		players.player.date = this.date;

		// This line should be inside POST success Function
		$http.post("http://127.0.0.1:3000/backoffice/players", players).success(function(data, status){
			$scope.rowCollection.push({ 'name': players.player.name	,'image': players.player.image, 'date' : players.player.date });
		}).error(function(){
			console.log("herro"); // TODO: slice rowCollection
		})	
	}

	/*$scope.removeRow = function(){
		var id = this.row.id;
		$http.delete("http://127.0.0.1:3000/backoffice/tournament/"+id).success(function(status){
			console.log(status); // TODO: slice rowCollection
		}).error(function(err){
			console.log(err); // TODO: Error message
		})
	} */



}]);


