var App = angular.module('App');

App.controller('tournamentCtrl',['$scope', '$http', 'Upload', function($scope, $http, Upload) {

	$scope.rowCollection = [];
	
	var tournaments = {
		tournament : {
			name: "",
			type: "",
			date: "",
			img: ""
		}
	};

	var ctrl = this;
	
	// Get all tournaments //
	$http.get("http://127.0.0.1:3000/backoffice/tournaments").success(function( data ) {
		$scope.rowCollection = data;
	});	

	// Add new tournament //
	$scope.addRow = function(){
		tournaments.tournament.name = this.name;
		tournaments.tournament.type = this.type;
		tournaments.tournament.date = this.date;
		tournaments.tournament.img = this.img;

		var self = this;

		// form post
		$http.post("http://127.0.0.1:3000/backoffice/tournament", tournaments).success(function(data, status){
			// insert in view
			console.log($scope.tournament.uploadForm);
			if($scope.tournament.uploadForm.img.$valid) { //check if from is valid
	      $scope.upload($scope.img); //call upload function
	    }
			$scope.rowCollection.push({ 'name': tournaments.tournament.name	,'type': tournaments.tournament.type, 'date' : tournaments.tournament.date });
			// clear input fields
			self.name = ""; self.type= ""; self.date = ""; self.img = "";
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

	$scope.uploadFile = function(img){
		var file = img.currentTarget.files[0];
	  
	  Upload.upload({
	      url: 'http://192.168.1.66:3000/backoffice/tournament/upload', //webAPI exposed to upload the img
	      method: 'PUT',
	      data:{img:file} //pass img as data, should be user ng-model
  		}).then(function (resp) { 
	      if(resp.status === 200){ //validate success
	  			//TODO : Render image on view	
	        console.log('Success ' + JSON.stringify(resp.data) + 'uploaded. Response: ');
	      } else {
	      	// Messa Error Uploading
	        console.log('an error occured');
	      }
	  	});
	};



}]);


