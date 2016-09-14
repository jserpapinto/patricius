var App = angular.module('App', ['ngRoute']);
// configure routes
App.config(function($locationProvider, $routeProvider) {
		// html5 history api
	$locationProvider.html5Mode(true);
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})
		.when('/tournmant', {
			templateUrl : '/pages/tournmant.html',
			controller  : 'tournmantController'
		})

		.when('/tournmant/addTeam', {
			templateUrl : '/partial/addTeam.html',
			controller  : 'tournmantController.addTeam'
		})
		.when('/teams', {
			templateUrl : '/pages/teams.html',
			controller  : 'teamController.getAll'
		})
		.when('/team/:id', {
			templateUrl : '/pages/team.html',
			controller  : 'teamController.getOne'
		})

		.otherwise({redirectTo: 'pages/home.html'})


});


App.controller('mainController', function($scope) {
	console.log("in main");
});

App.controller('tournmantController', function($scope) {
	console.log("tournmantController");
});

App.controller('teamController', function($scope) {
	console.log("teamController");
});




