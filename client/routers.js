var App = angular.module('App', ['ngRoute', 'smart-table']);
// configure routes
App.config(function($routeProvider, $locationProvider) {
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})
		.when('/tournament', {
			templateUrl : 'pages/tournament.html',
			controller  : 'tournamentCtrl'
		})

		.otherwise({redirectTo: 'pages/home.html'})

	// html5 history api
	$locationProvider.html5Mode(true);
});


App.controller('mainController', function($scope) {
	console.log("in main");
});
