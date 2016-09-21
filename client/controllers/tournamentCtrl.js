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
	$http.get("http://127.0.0.1:3000/backoffice/tournaments").success(function( data ) {
		$scope.rowCollection = data;
	});	

	// Add new tournament //
	$scope.addRow = function(){
		tournaments.tournament.name = this.name;
		tournaments.tournament.type = this.type;
		tournaments.tournament.date = this.date;

		var self = this;

		// form post
		$http.post("http://127.0.0.1:3000/backoffice/tournament", tournaments).success(function(data, status){
			// insert in view
			$scope.rowCollection.push({ 'name': tournaments.tournament.name	,'type': tournaments.tournament.type, 'date' : tournaments.tournament.date });
			// clear input fields
			self.name = ""; self.type= ""; self.date = "";
		}).error(function(){
			console.log("herro"); // TODO: warning that an error ocurred
		})	
	}

	$scope.removeRow = function(){
		var id = this.row.id;

		$http.delete("http://127.0.0.1:3000/backoffice/tournament/"+id).success(function(status){
			// slice row collection containing row id
			$.each($scope.rowCollection, function(i){
		    if($scope.rowCollection[i].id === id) {
		        $scope.rowCollection.splice(i,1);
		        return false;
		    }
			});
		}).error(function(err){
			console.log(err); // TODO: Error message
		})
	} 

	$scope.uploadFile = function(){
		var filename = event.target.files[0].name;
		var stringSplit = filename.split(".");
		var type = stringSplit[stringSplit.length-1];

		var allowed = ["jpeg", "jpg", "png", "JPG"];
		var found = $.inArray(type, allowed) > -1;
		// Check if image has correct type to inform view
		$scope.$apply(function(){
			$scope.found = !found;
			$scope.filename = filename;
		});
		// clear input if the incorrect format is inserted
		if(!found){
			angular.forEach(
				angular.element("input[type='file']"),
			function(inputElem) {
				angular.element(inputElem).val(null);
			});
		}

	};



}]);


