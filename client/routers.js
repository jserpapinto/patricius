var App = angular.module('App', ['ngRoute']);
// configure routes
App.config(function($routeProvider, $locationProvider) {
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})
		.when('/tournmant', {
			templateUrl : 'pages/tournmant.html',
			controller  : 'tournmantController'
		})

		.otherwise({redirectTo: 'pages/home.html'})

	// html5 history api
	$locationProvider.html5Mode(true);
});


App.controller('mainController', function($scope) {
	console.log("in main");
});

App.controller('tournmantController', function($scope) {
	console.log("tournmantController");
});


