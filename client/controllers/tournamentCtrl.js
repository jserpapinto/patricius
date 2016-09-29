var App = angular.module('App');

App.controller('tournamentCtrl',['$scope', '$http', function($scope, $http) {

	$scope.rowCollection = [];
	$scope.imageFound;
	$scope.touched = false;

	var outsideScope = this;
	var tournaments = {
		tournament : {
			name: "",
			type: "",
			date: "",
			img: {
				content: "",
				filename: "",
				size: 0,
				timestamp: 0
			}
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
		// tournament.image is filled in uploadFunction bellow
		var self = this;

		// form post
		$http.post("http://127.0.0.1:3000/backoffice/tournament", tournaments).success(function(data, status){
			// insert in view
			$scope.rowCollection.push({ 'name': tournaments.tournament.name	,'type': tournaments.tournament.type, 'date' : tournaments.tournament.date });
			// clear input fields
			self.name = ""; self.type= ""; self.date = ""; self.img = "";
			console.log(tournaments);
		}).error(function(){
			console.log("herro"); // TODO: warning that an error ocurred
		})	
	}

	// Delete tournament
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

	// Whenever the user uploads a file to the browser
	$scope.uploadFile = function(img){
		let file = img.currentTarget.files[0];
		let filename = img.currentTarget.files[0].name;

		let stringSplit = filename.split(".");
		let type = stringSplit[stringSplit.length-1];

		var allowed = ["jpeg", "jpg", "png", "JPG"];
		var found = $.inArray(type, allowed) > -1;

		// Check if image has correct type to inform view
		$scope.$apply(function(){
			$scope.touched = true;
		});

		if(file && found) {
	    var reader = new FileReader();
	    reader.readAsDataURL(file);
	    // inform view that we found an image
      $scope.$apply(function () {
      	$scope.filename = filename;
				$scope.imageFound = true;
  		});
  		// if all it's ok then on load we insert data base64 content in tournament obj
	    reader.onload = function (evt) {
	    		tournaments.tournament.img.filename = filename; 
	    		tournaments.tournament.img.size = evt.total; 
	    		tournaments.tournament.img.timestamp = evt.timeStamp;
	        tournaments.tournament.img.content = evt.target.result;
	    }
	    // in case we can't read image
	    reader.onerror = function (evt) {
        $scope.$apply(function () {
					$scope.imageFound = false;
    		});
	    }
		}else{
			// if file is not allowed we clear the input type file
			angular.forEach(
				angular.element("input[type='file']"),
			function(inputElem) {
				angular.element(inputElem).val(null);
			});
			// and apply imageFound false to scope
			$scope.$apply(function(){
				$scope.imageFound = false;
			})
		}
	};

}]);


